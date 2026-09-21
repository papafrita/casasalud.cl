'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function AnalyticsSettings() {
    // Currently hardcoded representation. This would eventually use /api/profiles/[id]
    const [gaId, setGaId] = useState('G-XXXXXXX');
    const [fbPixel, setFbPixel] = useState('');

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-8 border-b pb-4">Conectar Analytics</h3>
            <div className="space-y-6 max-w-xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Google Analytics ID</label>
                    <input
                        type="text"
                        value={gaId}
                        onChange={e => setGaId(e.target.value)}
                        placeholder="Ej. G-12345ABCD"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-2">Agrega tu ID de Google para rastrear las visitas a tu vitrina.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta (Facebook) Pixel ID</label>
                    <input
                        type="text"
                        value={fbPixel}
                        onChange={e => setFbPixel(e.target.value)}
                        placeholder="Ej. 1234567890123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-2">Agrega el ID de tu píxel para rastrear conversiones o crear campañas de remarketing.</p>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 flex items-center gap-2">
                        <Save className="w-4 h-4" /> Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
