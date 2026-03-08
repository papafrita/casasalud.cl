"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "@/actions/auth";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full mt-4"
        >
            {pending ? "Iniciando..." : "Ingresar"}
        </button>
    );
}

export default function LoginForm() {
    const [state, formAction] = useFormState(loginAction, null);

    return (
        <form action={formAction} className="space-y-4">
            {state?.error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                    {state.error}
                </div>
            )}
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
