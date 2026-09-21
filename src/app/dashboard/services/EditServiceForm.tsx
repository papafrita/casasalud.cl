'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, MessageSquare, MapPin, Save } from 'lucide-react';

export default function EditServiceForm({ service }: { service: any }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: service.name,
        durationMin: service.durationMin,
        price: service.price,
        type: service.type,
        requiresBoleta: service.requiresBoleta ?? true,
        locationDetails: service.locationDetails || '',
        billingDetails: service.billingDetails || '',
        remindersEnabled: service.remindersEnabled ?? true,
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await fetch(`/api/services/${service.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            // Show toast or success indication here in full app
        } catch (error) {
            console.error("Failed to update service:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={`bg-white rounded-2xl border transition-all ${isExpanded ? 'border-blue-200 shadow-md ring-1 ring-blue-50' : 'border-gray-200 shadow-sm hover:border-gray-300'}`}>
            <div
                className="p-6 flex items-center justify-between cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${service.type === 'ONLINE' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                        {/* Mock icons for simplified component */}
                        <div className="w-5 h-5 bg-current rounded-sm opacity-50" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">{formData.name}</h3>
                            {!service.isPublic && <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold">Privado</span>}
                        </div>
                        <div className="flex items-center justify-between gap-4 mt-1 text-sm text-gray-500 font-medium">
                            <span>{formData.durationMin} min</span>
                            <span>${formData.price?.toLocaleString('es-CL')}</span>
                            <span>{formData.type === 'ONLINE' ? 'Videollamada' : 'Presencial'}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={(e) => { e.stopPropagation(); /* copy link */ }}
                        className="p-2 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium shadow-sm"
                    >
                        Copiar Link
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                        {isExpanded ? <ChevronDown className="w-5 h-5 text-blue-600" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="border-t border-blue-100 bg-blue-50/10 px-6 py-6 space-y-4">
                    <form onSubmit={handleSave} className="space-y-4">
                        {/* Section 1: General */}
                        <div className="bg-white border text-left border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div
                                className="p-4 flex justify-between items-center cursor-pointer"
                                onClick={() => setExpandedSection(expandedSection === 'general' ? null : 'general')}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-gray-400 rounded-sm opacity-50" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Información General</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">Nombre, foto, descripción, requisitos</p>
                                    </div>
                                </div>
                                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'general' ? 'rotate-90' : ''}`} />
                            </div>
                            {expandedSection === 'general' && (
                                <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del servicio</label>
                                        <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Duración (min)</label>
                                            <input type="number" value={formData.durationMin} onChange={e => setFormData({ ...formData, durationMin: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
                                            <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section 2: Ubicación y Cobranza */}
                        <div className="bg-white border text-left border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div
                                className="p-4 flex justify-between items-center cursor-pointer"
                                onClick={() => setExpandedSection(expandedSection === 'location' ? null : 'location')}
                            >
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Ubicación y Cobranza</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">Sala física, link meeting, precios y pagos automáticos</p>
                                    </div>
                                </div>
                                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'location' ? 'rotate-90' : ''}`} />
                            </div>
                            {expandedSection === 'location' && (
                                <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Detalles de ubicación (ej. Link Zoom o Dirección)</label>
                                        <input type="text" value={formData.locationDetails} onChange={e => setFormData({ ...formData, locationDetails: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="https://zoom.us/..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Instrucciones de pago</label>
                                        <textarea rows={3} value={formData.billingDetails} onChange={e => setFormData({ ...formData, billingDetails: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Instrucciones que le llegan al paciente para transferir..." />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section 3: Comunicaciones */}
                        <div className="bg-white border text-left border-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <div
                                className="p-4 flex justify-between items-center cursor-pointer"
                                onClick={() => setExpandedSection(expandedSection === 'comms' ? null : 'comms')}
                            >
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Comunicaciones</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">Recordatorios WhatsApp, correos, cancelaciones</p>
                                    </div>
                                </div>
                                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'comms' ? 'rotate-90' : ''}`} />
                            </div>
                            {expandedSection === 'comms' && (
                                <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id={`reminders-${service.id}`}
                                            checked={formData.remindersEnabled}
                                            onChange={e => setFormData({ ...formData, remindersEnabled: e.target.checked })}
                                            className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                                        />
                                        <label htmlFor={`reminders-${service.id}`} className="text-sm font-medium text-gray-900">
                                            Enviar recordatorios automáticos (WhatsApp y Email)
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-2 flex justify-end">
                            <button type="submit" disabled={isSaving} className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 flex items-center gap-2">
                                <Save className="w-4 h-4" />
                                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
