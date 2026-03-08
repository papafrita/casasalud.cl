'use client';

import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { SortableAppointment } from './SortableAppointment';

// Simple mock data for MVP
const initialAppointments = [
    { id: '1', title: 'Flavia Zúñiga', time: '09:00', type: 'CONFIRMED' },
    { id: '2', title: 'Teresa Padilla', time: '10:30', type: 'PENDING_PAYMENT' },
    { id: '3', title: 'Angie M.', time: '11:15', type: 'CONFIRMED' }
];

export default function CalendarBoard() {
    const [appointments, setAppointments] = useState(initialAppointments);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setAppointments((items) => {
                const oldIndex = items.findIndex(i => i.id === active.id);
                const newIndex = items.findIndex(i => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-2">Martes 10 de Marzo</h3>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="flex flex-col gap-3">
                    <SortableContext
                        items={appointments.map(a => a.id)}
                    >
                        {appointments.map(app => (
                            <SortableAppointment key={app.id} id={app.id} appointment={app} />
                        ))}
                    </SortableContext>
                </div>
            </DndContext>

            <p className="mt-6 text-sm text-gray-400 text-center italic">
                Arrastra las tarjetas para reordenar la agenda del día.
            </p>
        </div>
    );
}
