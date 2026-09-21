'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const tabs = [
        { name: 'Perfil profesional', href: '/dashboard/settings/profile' },
        { name: 'Cuenta', href: '/dashboard/settings/account' },
        { name: 'Agendamiento', href: '/dashboard/settings/scheduling' },
        { name: 'Analytics', href: '/dashboard/settings/analytics' },
        { name: 'Ajuste de búsqueda', href: '/dashboard/settings/search' },
    ];

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Configuraciones</h2>
            </div>

            <div className="flex gap-2 mb-6 border-b border-gray-100 overflow-x-auto pb-1 custom-scrollbar">
                {tabs.map((tab) => {
                    const isActive = pathname.startsWith(tab.href);
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={`px-4 py-2 text-sm whitespace-nowrap ${isActive
                                    ? 'font-semibold text-gray-900 border-b-2 border-gray-900'
                                    : 'font-medium text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {tab.name}
                        </Link>
                    )
                })}
            </div>

            {children}
        </div>
    );
}
