'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const DAYS = [
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' },
    { value: 0, label: 'Domingo' },
];

export default function SchedulingSettings() {
    const [rules, setRules] = useState<{ dayOfWeek: number, startTime: string, endTime: string, active: boolean }[]>(
        DAYS.map(d => ({ dayOfWeek: d.value, startTime: '09:00', endTime: '18:00', active: false }))
    );
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/availability')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setRules(prev => prev.map(r => {
                        const existing = data.find((d: any) => d.dayOfWeek === r.dayOfWeek);
                        if (existing) {
                            return {
                                ...r,
                                active: true,
                                startTime: new Date(existing.startTime).toISOString().substr(11, 5),
                                endTime: new Date(existing.endTime).toISOString().substr(11, 5)
                            };
                        }
                        return r;
                    }));
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const activeRules = rules.filter(r => r.active);
            await fetch('/api/availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(activeRules)
            });
            alert('Horarios guardados correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al guardar');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-4 text-gray-500">Cargando configuración...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">Disponibilidad de Agenda</h3>

            <div className="space-y-4">
                {rules.map((rule, idx) => {
                    const dayLabel = DAYS.find(d => d.value === rule.dayOfWeek)?.label;
                    return (
                        <div key={rule.dayOfWeek} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3 w-40">
                                <input
                                    type="checkbox"
                                    checked={rule.active}
                                    onChange={(e) => {
                                        const newRules = [...rules];
                                        newRules[idx].active = e.target.checked;
                                        setRules(newRules);
                                    }}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className={`font-medium ${rule.active ? 'text-gray-900' : 'text-gray-400'}`}>{dayLabel}</span>
                            </div>

                            {rule.active ? (
                                <div className="flex items-center gap-3 flex-1">
                                    <input
                                        type="time"
                                        value={rule.startTime}
                                        onChange={(e) => {
                                            const newRules = [...rules];
                                            newRules[idx].startTime = e.target.value;
                                            setRules(newRules);
                                        }}
                                        className="px-3 py-1.5 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-700 font-medium"
                                    />
                                    <span className="text-gray-400 text-sm">hasta</span>
                                    <input
                                        type="time"
                                        value={rule.endTime}
                                        onChange={(e) => {
                                            const newRules = [...rules];
                                            newRules[idx].endTime = e.target.value;
                                            setRules(newRules);
                                        }}
                                        className="px-3 py-1.5 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-700 font-medium"
                                    />
                                </div>
                            ) : (
                                <div className="text-sm text-gray-400 italic flex-1">
                                    No disponible
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 shadow-sm"
                >
                    <Save className="w-4 h-4" />
                    {saving ? 'Guardando...' : 'Guardar Horarios'}
                </button>
            </div>
        </div>
    );
}
