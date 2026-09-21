'use client';

import { useState, useEffect } from 'react';
import { Save, Eye, Palette, Star } from 'lucide-react';

export default function VitrinaConfigForm() {
    const [config, setConfig] = useState({
        isPubliclyVisible: true,
        themeColor: 'blue',
        showReviews: true,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchConfig() {
            try {
                const res = await fetch('/api/vitrina');
                const data = await res.json();
                if (data.searchSettings) {
                    setConfig({
                        isPubliclyVisible: data.searchSettings.isPubliclyVisible ?? true,
                        themeColor: data.searchSettings.themeColor || 'blue',
                        showReviews: data.searchSettings.showReviews ?? true,
                    });
                }
            } catch (error) {
                console.error("Failed to load vitrina config", error);
            } finally {
                setLoading(false);
            }
        }
        fetchConfig();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch('/api/vitrina', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
        } catch (error) {
            console.error("Failed to save vitrina config", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return null;

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Configuración de tu Vitrina</h3>
                    <p className="text-sm text-gray-500">Personaliza la apariencia y visibilidad de tu perfil público</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    <Save className="w-4 h-4" /> {saving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>

            <div className="space-y-6 max-w-2xl">
                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 mt-0.5">
                        <Eye className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <label htmlFor="visibility-toggle" className="font-semibold text-gray-900 cursor-pointer">Visibilidad Pública</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="visibility-toggle"
                                    className="sr-only peer"
                                    checked={config.isPubliclyVisible}
                                    onChange={e => setConfig({ ...config, isPubliclyVisible: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <p className="text-sm text-gray-500">Permite que tu perfil sea accesible a través de tu link directo. Si lo apagas, tu vitrina mostrará un mensaje de "No disponible".</p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 mt-0.5">
                        <Palette className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold text-gray-900 mb-1">Color de Énfasis</label>
                        <p className="text-sm text-gray-500 mb-3">Elige el color principal que verán tus pacientes en los botones y enlaces de tu vitrina.</p>

                        <div className="flex gap-3">
                            {['blue', 'slate', 'emerald', 'rose', 'amber'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => setConfig({ ...config, themeColor: color })}
                                    className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform ${color === 'blue' ? 'bg-blue-600 focus:ring-blue-600' :
                                            color === 'slate' ? 'bg-slate-800 focus:ring-slate-800' :
                                                color === 'emerald' ? 'bg-emerald-600 focus:ring-emerald-600' :
                                                    color === 'rose' ? 'bg-rose-600 focus:ring-rose-600' :
                                                        'bg-amber-500 focus:ring-amber-500'
                                        } ${config.themeColor === color ? 'ring-2 ring-offset-2 scale-110 !border-gray-900' : 'border border-transparent'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 mt-0.5">
                        <Star className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <label htmlFor="reviews-toggle" className="font-semibold text-gray-900 cursor-pointer">Mostrar Evaluaciones</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="reviews-toggle"
                                    className="sr-only peer"
                                    checked={config.showReviews}
                                    onChange={e => setConfig({ ...config, showReviews: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <p className="text-sm text-gray-500">Haz públicas las calificaciones y comentarios que dejan tus pacientes después de las atenciones.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
