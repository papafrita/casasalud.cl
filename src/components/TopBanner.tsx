import { getSession } from "@/lib/auth";
import { logoutAction } from "@/actions/auth";
import Link from "next/link";

export default async function TopBanner() {
    const session = await getSession();

    return (
        <div className="fixed top-0 left-0 w-full bg-white/90 border-b border-gray-200 text-gray-700 z-[100] px-6 py-2.5 flex justify-between items-center shadow-sm backdrop-blur-md">
            <div className="text-sm font-medium flex items-center gap-2">
                {session ? (
                    <>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        <span className="flex items-center">
                            Conectado como: <span className="font-semibold text-[#6366f1] ml-1">{session.email}</span>
                            <span className="ml-3 text-[10px] uppercase font-bold tracking-wider bg-[#6366f1]/10 border border-[#6366f1]/20 px-2 py-0.5 rounded-full text-[#6366f1]">{session.role}</span>
                        </span>
                    </>
                ) : (
                    <>
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="text-gray-500">No has iniciado sesión</span>
                    </>
                )}
            </div>
            <div>
                {session ? (
                    <form action={logoutAction}>
                        <button type="submit" className="text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-transparent px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            Cerrar Sesión
                        </button>
                    </form>
                ) : (
                    <div className="flex gap-3">
                        <Link href="/login" className="text-[#6366f1] hover:text-[#4f46e5] font-medium text-sm transition-colors flex items-center gap-1">
                            Iniciar Sesión
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
