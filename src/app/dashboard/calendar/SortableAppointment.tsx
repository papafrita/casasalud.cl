'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export function SortableAppointment({ id, appointment }: { id: string, appointment: { title: string, type: string, time: string } }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-3 bg-[#f9fafb] border border-gray-200 rounded-lg p-3 touch-none group hover:border-[#6366f1] transition-colors bg-white shadow-sm"
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab p-1 text-gray-400 hover:text-gray-600 active:cursor-grabbing"
            >
                <GripVertical className="w-5 h-5" />
            </div>

            <div className="flex-1 flex justify-between items-center">
                <div>
                    <p className="font-semibold text-sm text-gray-900">{appointment.title}</p>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${appointment.type === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                        {appointment.type === 'CONFIRMED' ? 'Confirmada' : 'Pago Pdte'}
                    </span>
                </div>
                <div className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-md border shadow-sm">
                    {appointment.time}
                </div>
            </div>
        </div>
    );
}
