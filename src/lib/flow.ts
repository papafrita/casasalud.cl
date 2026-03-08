import crypto from 'crypto';

interface FlowPayload {
    commerceOrder: string;
    subject: string;
    currency: 'CLP';
    amount: number;
    email: string;
    paymentMethod: number; // 9 = All methods
    urlConfirmation: string;
    urlReturn: string;
}

export class FlowClient {
    private apiKey: string;
    private secretKey: string;
    private baseUrl: string;

    constructor() {
        this.apiKey = process.env.FLOW_API_KEY || '';
        this.secretKey = process.env.FLOW_SECRET_KEY || '';
        this.baseUrl = process.env.FLOW_BASE_URL || 'https://sandbox.flow.cl/api';
    }

    private sign(params: Record<string, string | number>): string {
        const sortedKeys = Object.keys(params).sort();
        const toSign = sortedKeys.map(k => `${k}${params[k]}`).join('');
        return crypto.createHmac('sha256', this.secretKey).update(toSign).digest('hex');
    }

    async createPayment(payload: FlowPayload) {
        if (!this.apiKey || !this.secretKey) {
            throw new Error('Flow credentials are not configured.');
        }

        const params: Record<string, string | number> = {
            apiKey: this.apiKey,
            ...payload
        };

        const signature = this.sign(params);
        params.s = signature;

        const formData = new URLSearchParams();
        for (const key in params) {
            formData.append(key, String(params[key]));
        }

        const response = await fetch(`${this.baseUrl}/payment/create`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Flow API Error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        return data.url + '?token=' + data.token;
    }

    validateWebhookSignature(params: Record<string, string>, signature: string): boolean {
        const filteredParams = { ...params };
        delete filteredParams.s;

        const expectedSignature = this.sign(filteredParams);
        return expectedSignature === signature;
    }
}

export const flowClient = new FlowClient();
