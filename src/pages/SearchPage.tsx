import {Link} from 'react-router-dom';
import {Loader2, Magnet, Search} from 'lucide-react';
import {useTorrents} from "../services/torrent.ts";

export default function SearchPage() {
    const {data: torrents, isLoading, error} = useTorrents();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-[var(--primary-accent)]">
                <Loader2 className="animate-spin w-10 h-10"/>
            </div>
        );
    }

    // Gestion d'erreur
    if (error) {
        return <div className="text-red-500 text-center pt-20">Erreur : {error.message}</div>;
    }

    return (
        <div className="container pt-10 pb-20">
            <header
                className="flex justify-between items-center p-6 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl mb-12 shadow-2xl">
                <div className="text-2xl font-bold tracking-widest flex items-center gap-2">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         className="text-[var(--primary-accent)]">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <span className="text-white">FLUX</span>
                    <span className="text-[var(--primary-accent)] font-light">TORRENT</span>
                </div>
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    <a href="#" className="hover:text-white hover:scale-105 transition text-gray-300">Parcourir</a>
                    <a href="#" className="hover:text-white hover:scale-105 transition text-gray-300">Top 100</a>
                    <a href="#" className="hover:text-white hover:scale-105 transition text-gray-300">Login</a>
                </nav>
            </header>

            <section className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
                    Qu'allons-nous découvrir ?
                </h1>

                <div className="relative max-w-2xl mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Rechercher des torrents..."
                        className="w-full py-5 pl-8 pr-16 rounded-full bg-black/30 backdrop-blur-md border border-[var(--glass-border)] text-white text-lg focus:outline-none focus:border-[var(--primary-accent)] focus:shadow-[0_0_20px_rgba(0,255,157,0.2)] transition"
                    />
                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--primary-accent)] rounded-full flex items-center justify-center hover:scale-110 transition text-black">
                        <Search size={24} strokeWidth={3}/>
                    </button>
                </div>

                <div className="flex justify-center gap-3 flex-wrap">
                    {['Tout', 'Audio', 'Vidéo', 'Apps', 'Jeux'].map((filter, idx) => (
                        <button key={idx}
                                className={`px-6 py-2 rounded-full border border-[var(--glass-border)] transition ${idx === 0 ? 'bg-[var(--glass-highlight)] border-[var(--primary-accent)]' : 'hover:bg-white/10'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </section>

            <main
                className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl p-8 shadow-2xl overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                    <tr className="text-[var(--text-muted)] text-sm uppercase tracking-wider border-b border-[var(--glass-border)]">
                        <th className="pb-4 pl-4 font-medium w-1/2">Nom</th>
                        <th className="pb-4 hidden md:table-cell font-medium">Date</th>
                        <th className="pb-4 font-medium">SE</th>
                        <th className="pb-4 font-medium">LE</th>
                        <th className="pb-4 font-medium">Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-sm">
                    {torrents!.map((torrent) => (
                        <tr key={torrent.id} className="group hover:bg-white/5 transition rounded-xl">
                            <td className="py-4 pl-4 border-b border-white/5 group-last:border-none">
                                <Link to={`/details/${torrent.id}`}
                                      className="block text-base font-semibold text-white mb-1 hover:text-[var(--primary-accent)] transition">
                                    {torrent.name}
                                </Link>
                                <div className="flex gap-2 items-center text-xs text-[var(--text-muted)]">
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">{torrent.type}</span>
                                    <span>{torrent.size}</span> • <span>Par  <strong
                                    className="text-gray-300">{torrent.uploader}</strong></span>
                                </div>
                            </td>
                            <td className="py-4 border-b border-white/5 hidden md:table-cell text-[var(--text-muted)]">{torrent.date}</td>
                            <td className="py-4 border-b border-white/5 text-[var(--primary-accent)] font-bold">{torrent.se}</td>
                            <td className="py-4 border-b border-white/5 text-[var(--danger)] font-bold">{torrent.le}</td>
                            <td className="py-4 border-b border-white/5">
                                <button
                                    className="text-[var(--primary-accent)] border border-[var(--primary-accent)] px-3 py-1.5 rounded-lg text-xs hover:bg-[var(--primary-accent)] hover:text-black transition flex items-center gap-1">
                                    <Magnet size={14}/> Magnet
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
        ;
}