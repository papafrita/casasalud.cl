'use client';

import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';

export default function MarkdownEditor({
    patientId,
    providerId
}: {
    patientId: string,
    providerId: string
}) {
    const [value, setValue] = useState<string>("**Motivo de consulta:**\n\n**Examen Físico:**\n\n**Observaciones:**\n\n**Plan Terapéutico:**\n");
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // In Phase 2 MVP, saving just fakes a delay. In Phase 4 this will be AES-256 encrypted before passing to an action.
    const handleSave = async () => {
        console.log(`Saving clinical record for patient ${patientId} by provider ${providerId}`);
        setIsSaving(true);
        setIsSaved(false);

        // Fake network request
        await new Promise(resolve => setTimeout(resolve, 800));

        setIsSaving(false);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-4" data-color-mode="light">
            <MDEditor
                value={value}
                onChange={(val) => setValue(val || '')}
                height={400}
                preview="edit"
                className="border-gray-200"
            />
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> :
                        isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {isSaving ? 'Guardando...' : isSaved ? 'Guardado' : 'Guardar Evolución'}
                </button>
            </div>
        </div>
    );
}
