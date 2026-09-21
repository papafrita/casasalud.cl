'use client';

import { useState, useEffect } from 'react';
import { Download, Search } from 'lucide-react';

export default function FinancesTabs() {
    const [payments, setPayments] = useState<any[]>([]);
    const [tab, setTab] = useState<'pagos' | 'atenciones'>('pagos');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFinances() {
            try {
                const res = await fetch('/api/finances');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setPayments(data);
                }
            } catch (error) {
                console.error("Failed to load finances", error);
            } finally {
                setLoading(false);
            }
        }
        fetchFinances();
    }, []);

    const exportToExcel = () => {
        // In a real app we'd use a library like xlsx here
        // For now, create a simple CSV
        const headers = ['Fecha', 'Paciente', 'RUT', 'Monto', 'Estado', 'Servicio'];
        const rows = payments.map(p => [
            new Date(p.createdAt).toLocaleDateString(),
            p.patient?.name || 'N/A',
            p.patient?.rut || 'N/A',
            p.amount,
            p.status,
            p.appointment?.service?.name || 'N/A'
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `finanzas_${tab}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="pt-8">
            <h3 className="font-bold text-gray-900 mb-6">Detalle de transacciones</h3>

            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setTab('pagos')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border ${tab === 'pagos' ? 'bg-gray-100 border-gray-200 text-gray-900' : 'bg-white border-transparent text-gray-500 hover:text-gray-900 shadow-sm border-gray-200'}`}
                    >
                        Pagos
                    </button>
                    <button
                        onClick={() => setTab('atenciones')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border ${tab === 'atenciones' ? 'bg-gray-100 border-gray-200 text-gray-900' : 'bg-white border-transparent text-gray-500 hover:text-gray-900 shadow-sm border-gray-200'}`}
                    >
                        Atenciones
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Buscar paciente..."
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white min-w-[250px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        onClick={exportToExcel}
                        className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2 shadow-sm"
                    >
                        <Download className="w-4 h-4" /> Exportar a Excel
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                    Cargando...
                                </td>
                            </tr>
                        ) : payments.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No hay transacciones para mostrar.
                                </td>
                            </tr>
                        ) : (
                            payments.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(p.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {p.patient?.name || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {p.appointment?.service?.name || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${p.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                                p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
