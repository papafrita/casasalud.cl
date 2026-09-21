'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewList() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);

    const fetchReviews = async (pageNumber: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/reviews?page=${pageNumber}&limit=5`);
            const data = await res.json();
            if (data.reviews) {
                setReviews(data.reviews);
                setTotalPages(data.pagination.totalPages);
                setTotalReviews(data.pagination.total);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews(page);
    }, [page]);

    if (loading && reviews.length === 0) {
        return <div className="text-center py-10 text-gray-500">Cargando evaluaciones...</div>;
    }

    if (!loading && reviews.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center py-20">
                <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Aún no hay evaluaciones</h3>
                <p className="text-gray-500 max-w-sm mx-auto text-sm">
                    Tus pacientes podrán calificar tu atención una vez que finalices la cita desde tu agenda.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Historial de evaluaciones ({totalReviews})</h3>
            </div>

            <div className="divide-y divide-gray-100">
                {reviews.map((review) => (
                    <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {review.comment || (
                                <span className="text-gray-400 italic">El paciente no dejó comentario.</span>
                            )}
                        </p>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                        Página {page} de {totalPages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="p-1 border border-gray-200 rounded text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 bg-white"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            className="p-1 border border-gray-200 rounded text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 bg-white"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
