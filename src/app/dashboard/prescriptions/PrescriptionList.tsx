'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, RefreshCw, ExternalLink, MoreVertical } from 'lucide-react';

export default function PrescriptionList() {
    const [prescriptions, setPrescriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPrescriptions() {
            try {
                const res = await fetch('/api/prescriptions');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setPrescriptions(data);
                }
            } catch (error) {
                console.error("Failed to load prescriptions", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPrescriptions();
    }, []);

    // Also include a few mocked up ones if the database is empty so the UI doesn't look completely barren during the demo
    const displayDocs = prescriptions.length > 0 ? prescriptions : [
        { id: 1, id_string: '810', createdAt: new Date().toISOString(), patient: { name: 'Johnny Garrido', rut: '13812449-5' }, type: 'Receta simple', status: 'Vigente' },
        { id: 2, id_string: '809', createdAt: new Date().toISOString(), patient: { name: 'Ignacio Alonso Palominos Chiang', rut: '24964737-3' }, type: 'Certificado', status: 'Vigente' },
    ];

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Cargando recetas...</div>;
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-4">
            <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-[#fcfdfd]">
                    <tr>
                        <th scope="col" className="px-4 py-4 w-10"></th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 w-24">
                            <div className="flex items-center gap-1 cursor-pointer">N° <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                        </th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 w-44">
                            <div className="flex items-center gap-1 cursor-pointer">Fecha <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                        </th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 min-w-48">
                            <div className="flex items-center gap-1 cursor-pointer">Paciente <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                        </th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 w-36">
                            <div className="flex items-center gap-1 cursor-pointer">RUT <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                        </th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 w-48">
                            <div className="flex items-center gap-1 cursor-pointer">Tipo <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                        </th>
                        <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 w-32">
                            <div className="flex items-center gap-1 cursor-pointer">Estado <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></div>
                        </th>
                        <th scope="col" className="px-4 py-4 text-center text-xs font-medium text-gray-500 w-48">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {displayDocs.map((doc, index) => (
                        <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-4 py-4 whitespace-nowrap text-center">
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors mx-auto cursor-pointer" />
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                {doc.id_string || (doc.id.toString().padStart(3, '0'))}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                {new Date(doc.createdAt).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span className="text-sm font-medium text-[#2563eb] hover:underline cursor-pointer">{doc.patient?.name || 'N/A'}</span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 tabular-nums">
                                {doc.patient?.rut || 'N/A'}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                {doc.type || 'Receta simple'}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-[4px] text-xs font-medium bg-[#ecfdf5] text-[#069e73]">
                                    {doc.status || 'Vigente'}
                                </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex justify-center items-center gap-2">
                                    <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-[4px] transition-colors bg-white">
                                        <RefreshCw className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-[4px] transition-colors bg-white">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1.5 border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-[4px] transition-colors bg-white">
                                        <MoreVertical className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
