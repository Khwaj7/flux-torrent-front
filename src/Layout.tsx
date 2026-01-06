import { Outlet, ScrollRestoration } from 'react-router-dom';
import DonationModal from './components/DonationModal';
import { useState } from 'react';

export default function Layout() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ScrollRestoration />

            <div className="liquid-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <Outlet />

            <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary-accent)] to-emerald-600 text-black font-bold text-xl shadow-lg hover:scale-110 transition flex items-center justify-center z-40 border-2 border-white/20"
            >
            </button>
        </>
    );
}