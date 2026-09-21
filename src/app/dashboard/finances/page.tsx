import { requireProvider } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { HelpCircle, ChevronDown } from 'lucide-react';
import FinancesTabs from './FinancesTabs';

export default async function FinancesPage() {
    await requireProvider();
    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Finanzas</h2>
                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                    <HelpCircle className="w-4 h-4 text-gray-500" strokeWidth={2.5} />
                    ¿Cuándo te depositamos?
                </button>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-gray-800 font-medium mb-1">Este miércoles 11 de marzo recibirás</p>
                            <h3 className="text-[32px] font-bold text-gray-900 leading-tight">$335.055</h3>
                        </div>
                        <div className="flex bg-gray-100 rounded-full p-1 text-sm border border-gray-200">
                            <button className="px-4 py-1 font-medium bg-white shadow-sm rounded-full text-gray-900">Pesos</button>
                            <button className="px-4 py-1 font-medium text-gray-500 hover:text-gray-900">Dólares</button>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white transition-colors">
                            Ver mis abonos
                        </button>
                        <button className="px-5 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white transition-colors">
                            Ver cuenta bancaria
                        </button>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 flex flex-col justify-between">
                    <div>
                        <p className="text-[#d93025] font-medium mb-1">
                            Total por cobrar histórico
                        </p>
                        <h3 className="text-[32px] font-bold text-gray-900 leading-tight">$75.000</h3>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button className="px-5 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white transition-colors mt-auto">
                            Ir a cobrar
                        </button>
                    </div>
                </div>
            </div>

            {/* Monthly Summary */}
            <div className="pt-8">
                <div className="flex items-center gap-3 mb-6">
                    <span className="font-semibold text-gray-900">Resumen de</span>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 cursor-pointer bg-white w-48 justify-between">
                        <span className="text-gray-700 font-medium text-sm">Marzo 2026</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between h-[220px]">
                        <div>
                            <h3 className="text-3xl font-medium text-[#2563eb] mb-2 leading-none">$355.000</h3>
                            <button className="text-[13px] text-gray-500 hover:text-gray-700 flex items-center gap-1.5 font-medium">
                                <HelpCircle className="w-3.5 h-3.5" />
                                ¿Qué significa esto?
                            </button>
                        </div>

                        <div className="space-y-3.5 mt-auto border-t border-gray-200 pt-5">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Por atenciones de meses anteriores</span>
                                <span className="font-semibold text-gray-900">$0</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Por atenciones de este mes</span>
                                <span className="font-semibold text-gray-900">$355.000</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Por atenciones de meses futuros</span>
                                <span className="font-semibold text-gray-900">$0</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col h-[220px]">
                        <p className="text-gray-900 font-medium mb-4">Se emitieron</p>
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-[32px] font-medium text-[#2563eb] leading-none">12</span>
                            <span className="text-[#2563eb] text-lg font-medium cursor-pointer">boletas</span>
                        </div>

                        <div className="mt-auto pt-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Monto boleteado</span>
                                <span className="font-semibold text-gray-900">$355.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FinancesTabs />
        </div>
    );
}
