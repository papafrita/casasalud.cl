"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registerPatientAction } from "@/actions/auth";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full mt-4"
        >
            {pending ? "Registrando..." : "Registrarse"}
        </button>
    );
}

export default function PatientRegisterForm() {
    const [state, formAction] = useFormState(registerPatientAction, null);

    return (
        <form action={formAction} className="space-y-4">
            {state?.error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                    {state.error}
                </div>
            )}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                </label>
                <input
                    name="name"
                    type="text"
                    required
                    placeholder="Juan Pérez"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="juan@ejemplo.com"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                </label>
                <input
                    name="password"
                    type="password"
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <SubmitButton />
        </form>
    );
}
