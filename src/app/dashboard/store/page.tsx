import { requireProvider } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createDigitalProduct, deleteDigitalProduct } from '@/actions/vitrina';
import { ChevronRight, Box, MonitorPlay, CreditCard, HelpCircle, FileText, ChevronDown } from 'lucide-react';
import VitrinaConfigForm from './VitrinaConfigForm';

export default async function StorePage() {
    await requireProvider();
    // Mock user fetching
    const user = await prisma.user.findFirst({ where: { role: 'PROVIDER' } });
    if (!user) return <div>No provider found.</div>;

    const products = await prisma.digitalProduct.findMany({
        where: { providerId: user.id },
        orderBy: { title: 'asc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Vitrina</h2>
                </div>
                <div>
                    <button className="flex items-center gap-2 bg-[#1a73e8] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
                        Crear <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>

            <VitrinaConfigForm />

            {/* Banner Section similar to screenshot */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10">
                <div className="flex flex-col md:flex-row">
                    <div className="p-10 md:w-3/5 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Escala tu consulta con La Vitrina</h3>
                        <p className="text-gray-600 text-lg mb-8 max-w-xl">
                            Tu consulta puede ser mucho más que sólo servicios: ofrece productos atractivos para llamar la atención de nuevos pacientes.
                        </p>
                        <button className="text-[#1a73e8] font-semibold flex items-center gap-1 hover:underline w-fit">
                            Descubre cómo se usa <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="md:w-2/5 bg-gray-50 flex items-center justify-center p-8 relative overflow-hidden">
                        {/* Abstract phone mock representation */}
                        <div className="w-48 h-96 bg-gray-900 rounded-[2rem] border-4 border-gray-800 flex flex-col items-center justify-center p-2 relative shadow-2xl transform rotate-2">
                            <div className="w-full h-full bg-white rounded-3xl overflow-hidden flex flex-col">
                                <div className="h-6 w-1/3 bg-black mx-auto mt-2 rounded-b-xl mb-4"></div>
                                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-center gap-2 text-xs font-bold text-red-500">
                                    <span className="w-2 h-2 rounded-sm bg-red-500 transform rotate-45"></span> casasalud
                                </div>
                                <div className="p-3 flex-1 flex flex-col items-center justify-center">
                                    <div className="w-full h-24 bg-blue-600 rounded-lg transform -skew-y-3 mb-4 shadow-md"></div>
                                    <p className="text-xs font-bold text-center">🎁 Gift card: regala felicidad a alguien especial</p>
                                    <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded text-xs font-bold">Comprar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 border-t border-gray-100 bg-gray-50/30">
                    <div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <Box className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Eventos online o presenciales</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Ofrece encuentros grupales gratuitos o pagados como charlas, webinars, talleres, etc</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <MonitorPlay className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Contenido digital</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Vende eBooks, Documentos pdf, charlas grabadas, etc. Tus pacientes podrán comprarlos en cualquier momento.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">¿Necesitas cobrar un monto extra?</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Crea un link de cobro que permita a tu paciente pagar una tarifa extra con flexibilidad de medios de pago.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">¿Tienes dudas?</h4>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">Configura tu cuenta con la ayuda de nuestro equipo a través de una videollamada</p>
                        <button className="text-sm font-medium text-blue-600 hover:underline">Agendar asesoría</button>
                    </div>
                </div>
            </div>

            {/* List of active digital products below the banner */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Mis Productos Activos</h3>
                {products.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No tienes productos en tu Vitrina o no has configurado la conexión con AWS S3.</p>
                        <p className="text-sm text-gray-400 mt-1">Crea tu primer eBook o taller.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(p => (
                            <div key={p.id} className="border border-gray-200 p-5 rounded-lg hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-gray-900 truncate">{p.title}</h4>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="font-semibold text-gray-900">${p.price.toLocaleString('es-CL')}</span>

                                    <form action={async () => {
                                        'use server';
                                        await deleteDigitalProduct(p.id);
                                    }}>
                                        <button className="text-sm font-medium text-red-600 hover:bg-red-50 px-2 py-1 rounded">
                                            Eliminar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
