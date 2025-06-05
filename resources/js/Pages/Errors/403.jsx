import React from 'react';
import { Link } from '@inertiajs/react';

export default function AccessDenied() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
            <h1 className="text-6xl ">403</h1>
            <p className="mt-4 text-xl text-gray-700">Anda tidak memiliki akses ke halaman ini.</p>
            <Link href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Kembali ke Beranda
            </Link>
        </div>
    );
}
