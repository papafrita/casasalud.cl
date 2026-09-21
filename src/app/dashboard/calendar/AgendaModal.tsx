'use client';

import { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, BriefcaseMedical } from 'lucide-react';

export default function AgendaModal({ isOpen, initialDate, onClose, onSaved }: { isOpen: boolean, initialDate?: Date, onClose: () => void, onSaved: () => void }) {
    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [isCreatingPatient, setIsCreatingPatient] = useState(false);
    const [newPatient, setNewPatient] = useState({ name: '', email: '', phone: '' });
    const [userRole, setUserRole] = useState<string | null>(null);
    const [requirePayment, setRequirePayment] = useState(true);
    const [formData, setFormData] = useState({
        patientId: '',
        serviceId: '',
        date: initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        time: '10:00'
    });

    useEffect(() => {
        if (isOpen) {
            fetch('/api/auth/me').then(res => res.json()).then(data => setUserRole(data.role)).catch(console.error);
            setFormData(prev => ({
                ...prev,
                date: initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            }));
            fetch('/api/patients', { cache: 'no-store' }).then(res => res.json()).then(data => {
                if (Array.isArray(data)) {
                    setPatients(data);
                    if (data.length > 0) {
                        setFormData(prev => ({ ...prev, patientId: data[0].id }));
                    }
                }
            });
            fetch('/api/services', { cache: 'no-store' }).then(res => res.json()).then(data => {
                if (Array.isArray(data)) {
                    setServices(data);
                    if (data.length > 0) {
                        setFormData(prev => ({ ...prev, serviceId: data[0].id }));
                    }
                }
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleCreatePatient = async () => {
        try {
            const res = await fetch('/api/patients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPatient)
            });
            const data = await res.json();
            if (res.ok) {
                setPatients(prev => [...prev, data]);
                setFormData(prev => ({ ...prev, patientId: data.id }));
                setIsCreatingPatient(false);
                setNewPatient({ name: '', email: '', phone: '' });
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error creating patient', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Calculate start and end times
            const start = new Date(`${formData.date}T${formData.time}:00`);
            const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour duration mock

            await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientId: formData.patientId,
                    serviceId: formData.serviceId,
                    startTime: start.toISOString(),
                    endTime: end.toISOString(),
                    status: requirePayment ? 'PENDING_PAYMENT' : 'CONFIRMED'
                })
            });
            onSaved();
            onClose();
        } catch (error) {
            console.error('Error saving appointment:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900">Agendar nueva atención</h2>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-semibold text-gray-700">Paciente</label>
                                {!isCreatingPatient && userRole !== 'PATIENT' && (
                                    <button type="button" onClick={() => setIsCreatingPatient(true)} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                        + Nuevo Paciente
                                    </button>
                                )}
                            </div>
                            
                            {isCreatingPatient ? (
                                <div className="space-y-3 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                                    <input 
                                        type="text" 
                                        placeholder="Nombre completo" 
                                        value={newPatient.name}
                                        onChange={e => setNewPatient({...newPatient, name: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Correo electrónico" 
                                        value={newPatient.email}
                                        onChange={e => setNewPatient({...newPatient, email: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                    <input 
                                        type="tel" 
                                        placeholder="Teléfono" 
                                        value={newPatient.phone}
                                        onChange={e => setNewPatient({...newPatient, phone: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                    <div className="flex justify-end gap-2 pt-1">
                                        <button type="button" onClick={() => setIsCreatingPatient(false)} className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded-md">Cancelar</button>
                                        <button type="button" onClick={handleCreatePatient} className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md disabled:opacity-50" disabled={!newPatient.email}>Guardar Paciente</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <select
                                        required
                                        disabled={userRole === 'PATIENT'}
                                        value={formData.patientId}
                                        onChange={e => setFormData({ ...formData, patientId: e.target.value })}
                                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none disabled:bg-gray-100 disabled:text-gray-500"
                                    >
                                        <option value="" disabled>Seleccione un paciente</option>
                                        {patients.map(p => (
                                            <option key={p.id} value={p.id}>{p.name || 'Sin nombre'} ({p.email})</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        required
                                        type="date"
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Hora inicio</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        required
                                        type="time"
                                        value={formData.time}
                                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Servicio</label>
                            <div className="relative">
                                <BriefcaseMedical className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    required
                                    value={formData.serviceId}
                                    onChange={e => setFormData({ ...formData, serviceId: e.target.value })}
                                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
                                >
                                    <option value="" disabled>Seleccione un servicio</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.id}>{s.name} - ${s.price}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {userRole !== 'PATIENT' && (
                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    id="requirePayment"
                                    checked={requirePayment}
                                    onChange={e => setRequirePayment(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <label htmlFor="requirePayment" className="text-sm text-gray-700 font-medium">
                                    Registrar como "Pago Pendiente"
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            Cancelar
                        </button>
                        <button disabled={loading} type="submit" className="px-5 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors shadow-sm disabled:opacity-50">
                            {loading ? 'Guardando...' : 'Agendar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
