import { requireProvider } from '@/lib/auth';
import ReviewList from './ReviewList';

export default async function ReviewsPage() {
    await requireProvider();
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-[22px] font-medium text-gray-900 tracking-tight">Evaluaciones de Pacientes</h2>
                    <p className="text-gray-500 text-sm mt-1">Revisa el feedback y las calificaciones de tus atenciones.</p>
                </div>
            </div>

            <ReviewList />
        </div>
    );
}
