"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { setSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function registerPatientAction(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || !name) {
        return { error: "Todos los campos son obligatorios" };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return { error: "El usuario ya existe" };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            passwordHash,
            role: "PATIENT",
        },
    });

    await setSession({ id: user.id, email: user.email, role: user.role });

    redirect("/?welcome=true#booking-section");
}

export async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email y contraseña son obligatorios" };
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
        return { error: "Credenciales inválidas" };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        return { error: "Credenciales inválidas" };
    }

    await setSession({ id: user.id, email: user.email, role: user.role });

    redirect("/dashboard/calendar");
}

export async function logoutAction() {
    await destroySession();
    redirect("/");
}
