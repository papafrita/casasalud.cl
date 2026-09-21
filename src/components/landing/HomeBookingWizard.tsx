'use client';

import { useState, useEffect } from 'react';
import { fetchSlotsAction, fetchProviderServicesAction, guestCheckoutAction, authenticatedCheckoutAction } from '@/actions/booking';
import { addDays, format, isBefore, startOfDay } from 'date-fns';
import { Calendar, Clock, Loader2, CheckCircle2, UserCircle, ArrowRight, ArrowLeft, Stethoscope, Lock, UserPlus } from 'lucide-react';
import { Slot } from '@/lib/availability';
import { toZonedTime } from 'date-fns-tz';
import Link from 'next/link';

const TIMEZONE = 'America/Santiago';

type Provider = { slug: string; fullName: string; specialty: string };
type Service = { id: string; name: string; durationMin: number; price: number; type: string };

export default function HomeBookingWizard({ providers, isAuthenticated, initialUserEmail, initialUserName }: { providers: Provider[], isAuthenticated: boolean, initialUserEmail?: string, initialUserName?: string }) {
    const [step, setStep] = useState(1);
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isLoadingServices, setIsLoadingServices] = useState(false);
    
    // Step 3 state (Calendar)
    const [selectedDate, setSelectedDate] = useState<Date>(startOfDay(new Date()));
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    // Step 4 state (Auth)
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: initialUserName || '',
        email: initialUserEmail || '',
        password: ''
    });

    // Load Services when step 2 active
    useEffect(() => {
        if (step === 2 && selectedProvider) {
            loadServices();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProvider, step]);

    // Load Slots when step 3 active
    useEffect(() => {
        if (step === 3 && selectedProvider && selectedService) {
            loadSlots();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate, selectedProvider, selectedService, step]);

    // Fast-track authenticated users in Step 4
    // Wait, let's keep step 4 as the Auth screen if not authenticated, 
    // or just a "Confirm Booking" screen if they are.

    async function loadServices() {
        if (!selectedProvider) return;
        setIsLoadingServices(true);
        try {
            const result = await fetchProviderServicesAction(selectedProvider.slug);
            setServices(result);
        } catch(err) {
            console.error(err);
        } finally {
            setIsLoadingServices(false);
        }
    }

    async function loadSlots() {
        if (!selectedProvider || !selectedService) return;
        setIsLoadingSlots(true);
        setSlots([]);
        setSelectedSlot(null);
        try {
            const dateStr = format(selectedDate, 'yyyy-MM-dd');
            const fetchedSlots = await fetchSlotsAction(selectedProvider.slug, dateStr, selectedService.id);
            setSlots(fetchedSlots);
        } catch (err) {
            console.error('Failed to load slots', err);
        } finally {
            setIsLoadingSlots(false);
        }
    }

    const handleDateChange = (days: number) => {
        const newDate = addDays(selectedDate, days);
        if (!isBefore(newDate, startOfDay(new Date()))) {
            setSelectedDate(newDate);
        }
    };

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot || !selectedProvider || !selectedService) return;

        setIsSubmitting(true);
        setError(null);
        try {
            let res;
            if (isAuthenticated) {
                // If the user happens to have standard session log in
                res = await authenticatedCheckoutAction(selectedProvider.slug, selectedSlot, selectedService.id);
            } else {
                // Inline Auth
                res = await guestCheckoutAction(
                    selectedProvider.slug,
                    selectedSlot,
                    selectedService.id,
                    { ...formData, isLoginMode: authMode === 'login' }
                );
            }

            if (res.error) {
                setError(res.error);
                setIsSubmitting(false);
                return;
            }

            setStep(5);
        } catch (err) {
            setError('Hubo un error al intentar reservar.');
        } finally {
            if (step !== 5) {
               setIsSubmitting(false);
            }
        }
    };

    const renderStep1 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Elige Especialista</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {providers.map((p) => (
                    <div
                        key={p.slug}
                        className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md hover:border-green-500 transition-all flex flex-col items-center"
                    >
                        <UserCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="font-semibold text-gray-900">{p.fullName}</h4>
                        <p className="text-sm text-gray-500 mt-1 mb-4">{p.specialty}</p>

                        <div className="flex flex-col gap-2 w-full mt-auto text-sm font-medium">
                            <button
                                onClick={() => { setSelectedProvider(p); setStep(2); }}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
                            >
                                Agendar Cita
                            </button>
                            <Link
                                href={`/especialista/${p.slug}`}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors"
                            >
                                Ver Perfil
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {providers.length === 0 && (
                <p className="text-center text-gray-500">No hay especialistas disponibles por el momento.</p>
            )}
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-4 mb-6 text-gray-500">
                <button onClick={() => setStep(1)} className="hover:text-gray-900 flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Volver
                </button>
                <div className="h-4 w-px bg-gray-300" />
                <span className="font-medium text-gray-900">{selectedProvider?.fullName}</span>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-6">Elige el Servicio</h3>

            {isLoadingServices ? (
                <div className="flex justify-center p-12">
                     <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((svc) => (
                        <button
                            key={svc.id}
                            onClick={() => { setSelectedService(svc); setStep(3); }}
                            className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:shadow-md hover:border-green-500 transition-all group"
                        >
                            <Stethoscope className="w-8 h-8 text-green-600 mb-3" />
                            <h4 className="font-semibold text-gray-900 text-lg">{svc.name}</h4>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {svc.durationMin} min</span>
                                <span>$ {svc.price.toLocaleString('es-CL')}</span>
                                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">{svc.type === 'ONLINE' ? 'Videollamada' : 'Presencial'}</span>
                            </div>
                        </button>
                    ))}
                    {services.length === 0 && (
                        <p className="text-center text-gray-500 col-span-2">Este profesional no tiene servicios configurados.</p>
                    )}
                </div>
            )}
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-4 mb-6 text-gray-500 overflow-x-auto whitespace-nowrap hide-scrollbar pb-2">
                <button onClick={() => setStep(1)} className="hover:text-gray-900 flex items-center gap-1 shrink-0">
                    <ArrowLeft className="w-4 h-4" /> Especialista
                </button>
                <div className="h-4 w-px bg-gray-300" />
                <button onClick={() => setStep(2)} className="hover:text-gray-900 flex items-center gap-1 shrink-0">
                    Servicio
                </button>
                <div className="h-4 w-px bg-gray-300 shrink-0" />
                <span className="font-medium text-gray-900 shrink-0">{selectedService?.name}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Mini Calendar / Date Picker Section */}
                <div className="w-full md:w-1/2 flex flex-col space-y-4">
                    <div className="flex items-center gap-2 text-gray-900 font-medium pb-2 border-b border-gray-100">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <span>Elige una fecha</span>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <button
                            onClick={() => handleDateChange(-1)}
                            disabled={isBefore(addDays(selectedDate, -1), startOfDay(new Date()))}
                            className="text-gray-400 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            &larr;
                        </button>
                        <span className="font-medium text-gray-800">
                            {format(selectedDate, 'dd/MM/yyyy')}
                        </span>
                        <button
                            onClick={() => handleDateChange(1)}
                            className="text-gray-400 hover:text-gray-900"
                        >
                            &rarr;
                        </button>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg mt-4 hidden md:block">
                        <p className="text-sm text-blue-800 flex items-center gap-2">
                           <Clock className="w-4 h-4" /> Duración de la sesión: {selectedService?.durationMin} min.
                        </p>
                    </div>
                </div>

                {/* Slots Section */}
                <div className="w-full md:w-1/2 flex flex-col space-y-4">
                    <div className="flex items-center gap-2 text-gray-900 font-medium pb-2 border-b border-gray-100">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span>Selecciona la hora</span>
                    </div>

                    <div className="min-h-[200px] relative">
                        {isLoadingSlots ? (
                            <div className="absolute inset-0 flex items-center justify-center text-green-600">
                                <Loader2 className="w-6 h-6 animate-spin" />
                            </div>
                        ) : slots.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                                {slots.map((slot, idx) => {
                                    const zonedTime = toZonedTime(new Date(slot.startTime), TIMEZONE);
                                    const timeString = format(zonedTime, 'HH:mm');
                                    const isSelected = selectedSlot === slot.startTime;

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedSlot(slot.startTime)}
                                            className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all ${isSelected
                                                ? 'bg-green-600 text-white border-green-600'
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-green-600 hover:text-green-600'
                                                }`}
                                        >
                                            {timeString}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                                Sin disponibilidad este día.
                            </div>
                        )}
                    </div>

                    {selectedSlot && (
                        <button
                            onClick={() => {
                                // Clear auth error before opening tab
                                setError(null);
                                setStep(4);
                            }}
                            className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
                        >
                            Continuar <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-4 mb-6 text-gray-500">
                <button onClick={() => setStep(3)} className="hover:text-gray-900 flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Volver a Horarios
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="mb-6 p-4 bg-green-50 rounded-lg text-green-900 text-sm">
                    Estás agendando <strong>{selectedService?.name}</strong> con <strong>{selectedProvider?.fullName}</strong> para el <strong>{format(selectedDate, 'dd/MM/yyyy')}</strong> a las <strong>{selectedSlot ? format(toZonedTime(new Date(selectedSlot), TIMEZONE), 'HH:mm') : ''}</strong>
                </div>

                {isAuthenticated ? (
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="py-2 text-center text-gray-600">
                            Estás agendando como <strong>{initialUserName || initialUserEmail}</strong>.
                        </div>
                        {error && <div className="text-red-500 text-sm p-3 bg-red-50 rounded">{error}</div>}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary w-full flex justify-center items-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmar Reserva'}
                        </button>
                    </form>
                ) : (
                    <div>
                        <div className="flex border-b border-gray-200 mb-6">
                            <button 
                                className={`flex-1 pb-3 font-medium text-sm transition-colors ${authMode === 'login' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                                onClick={() => setAuthMode('login')}
                            >
                                <Lock className="w-4 h-4 inline-block mr-1" /> Ya tengo cuenta
                            </button>
                            <button 
                                className={`flex-1 pb-3 font-medium text-sm transition-colors ${authMode === 'register' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                                onClick={() => setAuthMode('register')}
                            >
                                <UserPlus className="w-4 h-4 inline-block mr-1" /> Soy nuevo
                            </button>
                        </div>

                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                                    {error}
                                </div>
                            )}
                            
                            {authMode === 'register' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Juan Pérez"
                                    />
                                </div>
                            )}
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="juan@ejemplo.com"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary w-full flex justify-center items-center gap-2 mt-4"
                            >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (authMode === 'login' ? 'Iniciar Sesión y Reservar' : 'Crear Cuenta y Reservar')}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center animate-in zoom-in duration-500">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
            <h2 className="text-2xl font-semibold text-gray-900">¡Hora Reservada con Éxito!</h2>
            <p className="text-gray-500 max-w-md mt-2">
                Tu cita para <strong>{selectedService?.name}</strong> con <strong>{selectedProvider?.fullName}</strong> ha sido agendada y separada temporalmente.
            </p>
            <button onClick={() => window.location.href = '/dashboard'} className="btn-primary mt-6">
                Ir a mi panel
            </button>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto py-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
        </div>
    );
}
