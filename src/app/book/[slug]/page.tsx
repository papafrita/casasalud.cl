import { getProviderProfile } from '@/actions/booking';
import { notFound } from 'next/navigation';
import BookingWrapper from './BookingWrapper';

import { getSession } from '@/lib/auth';

export default async function BookingPage({ params }: { params: { slug: string } }) {
    const profile = await getProviderProfile(params.slug);
    const session = await getSession();
    const isAuthenticated = !!session;

    if (!profile) {
        notFound();
    }

    return (
        <main className="min-h-screen max-w-3xl mx-auto px-4 py-12 flex flex-col items-center">
            <div className="w-full card space-y-6">
                <header className="border-b border-gray-100 pb-6 text-center">
                    <h1 className="text-2xl font-semibold text-gray-900">{profile.fullName}</h1>
                    <p className="text-gray-500 mt-1">{profile.specialty}</p>
                    {profile.bio && <p className="text-gray-600 mt-4 text-sm leading-relaxed max-w-xl mx-auto">{profile.bio}</p>}
                </header>

                <BookingWrapper slug={params.slug} isAuthenticated={isAuthenticated} />
            </div>
        </main>
    );
}
