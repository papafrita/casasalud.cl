import React from 'react';

export default function Footer() {
    return (
        <footer className="footer bg-black text-white py-8">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} CasaSalud.cl</p>
            </div>
        </footer>
    );
}
