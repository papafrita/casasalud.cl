import PatientRegisterForm from "@/components/auth/PatientRegisterForm";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href="/">
                        <img
                            src="/assets/images/logo.png"
                            alt="CasaSalud Logo"
                            className="h-20 w-auto rounded-full"
                        />
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Registro de paciente
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?{" "}
                    <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <PatientRegisterForm />
                </div>
            </div>
        </div>
    );
}
