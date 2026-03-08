import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
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
                    Iniciar sesión
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    O{" "}
                    <Link href="/register" className="font-medium text-green-600 hover:text-green-500">
                        regístrate como nuevo paciente
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
