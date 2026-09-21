import nodemailer from 'nodemailer';

// You will need to add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS to your .env file
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendAppointmentEmails(
    patientEmail: string,
    providerEmail: string,
    appointmentDetails: {
        date: string;
        serviceName: string;
        patientName: string;
    }
) {
    // Override emails for testing purposes as requested
    const testPatientEmail = 'tomas@ouroai.net';
    const testProviderEmail = 'tomaxio@gmail.com';

    const { date, serviceName, patientName } = appointmentDetails;

    // Send to Patient
    const patientMailOptions = {
        from: `"CasaSalud" <${process.env.SMTP_USER}>`,
        to: testPatientEmail,
        subject: `Confirmación de cita - ${serviceName}`,
        html: `
            <h1>¡Hola, ${patientName}!</h1>
            <p>Tu cita para <strong>${serviceName}</strong> ha sido agendada con éxito.</p>
            <p><strong>Fecha y hora:</strong> ${new Date(date).toLocaleString('es-CL')}</p>
            <br/>
            <p>Gracias por usar CasaSalud.</p>
        `,
    };

    // Send to Provider
    const providerMailOptions = {
        from: `"CasaSalud" <${process.env.SMTP_USER}>`,
        to: testProviderEmail,
        subject: `Nueva cita agendada - ${serviceName} para ${patientName}`,
        html: `
            <h1>Tienes una nueva cita agendada</h1>
            <p>El paciente <strong>${patientName}</strong> ha agendado una cita para <strong>${serviceName}</strong>.</p>
            <p><strong>Fecha y hora:</strong> ${new Date(date).toLocaleString('es-CL')}</p>
        `,
    };

    try {
        await transporter.sendMail(patientMailOptions);
        console.log(`Email enviado con éxito al paciente (${testPatientEmail})`);
        
        await transporter.sendMail(providerMailOptions);
        console.log(`Email enviado con éxito al profesional (${testProviderEmail})`);
    } catch (error) {
        console.error('Error enviando los correos de cita:', error);
    }
}
