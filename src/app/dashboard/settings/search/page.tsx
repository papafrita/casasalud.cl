'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function SearchSettings() {
    const [allowSEO, setAllowSEO] = useState(true);

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-8 border-b pb-4">Ajuste de Búsqueda</h3>

            <div className="space-y-6 max-w-xl">
                <div className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        id="seo-toggle"
                        checked={allowSEO}
                        onChange={(e) => setAllowSEO(e.target.checked)}
                        className="mt-1 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="seo-toggle" className="text-sm cursor-pointer">
                        <span className="font-medium text-gray-900 block mb-1">Permitir indexación en motores de búsqueda (SEO)</span>
                        <span className="text-gray-500 block">Si activas esto, tu perfil público de CasaSalud ('Vitrina') podrá aparecer en resultados de Google y otros buscadores.</span>
                    </label>
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
