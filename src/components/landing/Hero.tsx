import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <header className="hero-section relative min-h-screen flex items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/header-bg.png')" }}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Logo */}
          <div className="logo-container">
            <div className="flex items-center">
              <img src="/assets/images/logo.png" alt="Logo" className="w-96 h-96 rounded-full mr-6" />
            </div>
          </div>

          {/* Tagline and Navigation */}
          <div className="text-center lg:text-left max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-8 leading-tight">
              Un refugio para cuidarnos integralmente
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
              <Link href="/login">
                <button className="nav-button">Iniciar Sesión</button>
              </Link>
              <Link href="/dashboard">
                <button className="nav-button">Ir al Panel</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
