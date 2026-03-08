import { prisma } from '@/lib/prisma';
import { Search, ChevronDown, Settings, Edit2, Plus, FileText, RefreshCw, ExternalLink, MoreVertical, ChevronRight } from 'lucide-react';

export default async function PrescriptionsPage() {
    // We will hardcode the UI presentation precisely to the screenshot
    const mockPrescriptions = [
        { id: 1, num: '810', date: 'sáb. 07 mar. 2026', patient: 'Johnny Garrido', rut: '13812449-5', type: 'Receta simple', status: 'Vigente' },
        { id: 2, num: '809', date: 'sáb. 07 mar. 2026', patient: 'Ignacio Alonso Palominos Chiang', rut: '24964737-3', type: 'Certificado', status: 'Vigente' },
        { id: 3, num: '808', date: 'sáb. 07 mar. 2026', patient: 'Ignacio Alonso Palominos Chiang', rut: '24964737-3', type: 'Receta simple', status: 'Vigente' },
        { id: 4, num: '807', date: 'sáb. 07 mar. 2026', patient: 'Mey-Lin Akiu Chiang Leyton', rut: '16712934-K', type: 'Receta simple', status: 'Vigente' },
        { id: 5, num: '806', date: 'sáb. 07 mar. 2026', patient: 'Florencia Pascal Rodriguez Hola', rut: '24574346-7', type: 'Receta simple', status: 'Vigente' },
        { id: 6, num: '805', date: 'sáb. 07 mar. 2026', patient: 'Constanza Hola Carvallo', rut: '19289505-7', type: 'Receta simple', status: 'Vigente' },
        { id: 7, num: '804', date: 'sáb. 07 mar. 2026', patient: 'Jessica aillapan Jaque', rut: '18074615-3', type: 'Orden de exámenes', status: 'Vigente' },
        { id: 8, num: '803', date: 'sáb. 07 mar. 2026', patient: 'Jessica aillapan Jaque', rut: '18074615-3', type: 'Receta simple', status: 'Vigente' },
        { id: 9, num: '802', date: 'sáb. 07 mar. 2026', patient: 'Fernanda Coronado', rut: '18434289-8', type: 'Orden de exámenes', status: 'Vigente' },
        { id: 10, num: '801', date: 'mar. 03 mar. 2026', patient: 'Jessica aillapan Jaque', rut: '18074615-3', type: 'Receta simple', status: 'Vigente' },
    ];

    return (
        <div className="space-y-6 max-w-[1400px]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-[22px] font-medium text-gray-900 tracking-tight">Recetas médicas</h2>
                <div className="flex items-center gap-3">
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 bg-white shadow-sm">
                        <Settings className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white shadow-sm">
                        <Edit2 className="w-4 h-4" /> Editar datos
                    </button>
                    <button className="flex items-center gap-2 bg-[#2563eb] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
                        <Plus className="w-4 h-4" /> Crear
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-transparent">
                <button className="px-4 py-1.5 text-sm font-medium bg-gray-100/80 text-gray-800 rounded-full">Todos (810)</button>
                <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-full">Simples (587)</button>
                <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-full">Retenidas (147)</button>
                <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-full">Órdenes (50)</button>
                <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-full">Certificados (26)</button>
                <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-full">Receta magistral (0)</button>
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center">
                <form className="relative w-full max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        name="q"
                        placeholder="Buscar por paciente o RUT..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    />
                </form>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white">
                        <FileText className="w-4 h-4 text-gray-500" /> Plantillas <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                    </button>
                </div>
            </div>

            {/* Table */}
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
                        {mockPrescriptions.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors mx-auto cursor-pointer" />
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {doc.num}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {doc.date}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-[#2563eb] hover:underline cursor-pointer">{doc.patient}</span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 tabular-nums">
                                    {doc.rut}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {doc.type}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-[4px] text-xs font-medium bg-[#ecfdf5] text-[#069e73]">
                                        {doc.status}
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
        </div>
    );
}
