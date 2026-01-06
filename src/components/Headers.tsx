export const Headers = () => {
    return (
        <header
            className="flex justify-between items-center p-6 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl mb-12 shadow-2xl">
            <div className="text-2xl font-bold tracking-widest flex items-center gap-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     className="text-[var(--primary-accent)]">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span className="text-white">Zephyr</span>
                <span className="text-[var(--primary-accent)] font-light">TORRENT</span>
            </div>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
                <a href="#" className="hover:text-white hover:scale-105 transition text-gray-300">Parcourir</a>
                <a href="#" className="hover:text-white hover:scale-105 transition text-gray-300">Top 100</a>
                <a href="#" className="hover:text-white hover:scale-105 transition text-gray-300">Login</a>
            </nav>
        </header>
    );
}