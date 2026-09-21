import { requireProvider } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Search, ChevronDown, Settings, Edit2, Plus, FileText } from 'lucide-react';
import PrescriptionList from './PrescriptionList';

export default async function PrescriptionsPage() {
    await requireProvider();
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

            <PrescriptionList />
        </div>
    );
}
