'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';

export default function ReportsList() {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchReports() {
            try {
                const res = await fetch('/api/reports');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setReports(data);
                }
            } catch (error) {
                console.error("Failed to load reports", error);
            } finally {
                setLoading(false);
            }
        }
        fetchReports();
    }, []);

    const handleDownload = (report: any) => {
        setDownloadingId(report.id);

        // Simulating a file generation/download delay
        setTimeout(() => {
            const csvContent = "data:text/csv;charset=utf-8," + "Report Data\n" + report.name;
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `${report.name.replace(/ /g, '_')}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setDownloadingId(null);
        }, 800);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-8 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Historial de Reportes</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Descarga resúmenes de tus atenciones y pagos pasados</p>
                </div>
            </div>

            <div className="divide-y divide-gray-100">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Cargando reportes...</div>
                ) : reports.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No hay reportes disponibles aún.</div>
                ) : (
                    reports.map((report) => (
                        <div key={report.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{report.name}</h4>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 font-medium">
                                        <span>{report.type}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>{new Date(report.date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>{report.size}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDownload(report)}
                                disabled={downloadingId === report.id}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 group-hover:opacity-100 opacity-70"
                            >
                                {downloadingId === report.id ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                ) : (
                                    <>
                                        <span className="text-sm font-medium hidden sm:inline-block">Descargar</span>
                                        <Download className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
