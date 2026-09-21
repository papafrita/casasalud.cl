'use client';

import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";

export default function BankDetailsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [formData, setFormData] = useState({
        bankName: '',
        accountType: '',
        accountNumber: '',
        rut: '',
        fullName: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetch('/api/connections/bank')
                .then(res => res.json())
                .then(data => {
                    if (data && data.rut) {
                        setFormData({
                            bankName: data.bankName || '',
                            accountType: data.accountType || '',
                            accountNumber: data.accountNumber || '',
                            rut: data.rut || '',
                            fullName: data.fullName || '',
                            email: data.email || ''
                        });
                    }
                })
                .catch(err => console.error("Error loading bank details:", err));
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await fetch('/api/connections/bank', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            onClose();
        } catch (error) {
            console.error("Failed to save bank details", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Datos bancarios</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                        <input required type="text" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Ej. Juan Pérez" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
                            <input required type="text" value={formData.rut} onChange={e => setFormData({ ...formData, rut: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="12.345.678-9" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="correo@ejemplo.com" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                        <select required value={formData.bankName} onChange={e => setFormData({ ...formData, bankName: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Selecciona un banco</option>
                            <option value="Banco de Chile">Banco de Chile</option>
                            <option value="Banco Santander">Banco Santander</option>
                            <option value="Banco Estado">Banco Estado</option>
                            <option value="BCI">BCI</option>
                            <option value="Scotiabank">Scotiabank</option>
                            <option value="Itaú">Itaú</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de cuenta</label>
                            <select required value={formData.accountType} onChange={e => setFormData({ ...formData, accountType: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                                <option value="">Selecciona tipo</option>
                                <option value="Cuenta Corriente">Cuenta Corriente</option>
                                <option value="Cuenta Vista / RUT">Cuenta Vista / RUT</option>
                                <option value="Cuenta de Ahorro">Cuenta de Ahorro</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Número de cuenta</label>
                            <input required type="text" value={formData.accountNumber} onChange={e => setFormData({ ...formData, accountNumber: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500" placeholder="12345678" />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
