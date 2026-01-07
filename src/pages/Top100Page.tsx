import { Link } from 'react-router-dom';
import { Loader2, Magnet, Trophy, Medal, TrendingUp } from 'lucide-react';
import { useTorrents } from "../services/torrent.ts";
import { Headers } from "../components/Headers.tsx";
import { TYPE_STYLES } from '../styles/TypeStyles.ts';

const TrendLine = ({ color }: { color: string }) => {
    const points = Array.from({ length: 8 }, (_, i) => `${i * 10},${Math.floor(Math.random() * 20)}`).join(' ');
    return (
        <svg width="50" height="20" className="opacity-80">
            <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" points={points} />
        </svg>
    );
};

export default function Top100Page() {
    const { data: torrents, isLoading, error } = useTorrents();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-[var(--primary-accent)]">
                <Loader2 className="animate-spin w-10 h-10" />
            </div>
        );
    }

    if (error) return <div className="text-red-500 text-center pt-20">Erreur : {error.message}</div>;

    const topTorrents = torrents && [...torrents].sort((a, b) => b.se - a.se).slice(0, 100);
    const podium = topTorrents?.slice(0, 3);
    const theRest = topTorrents?.slice(3, 100);

    // Styles assombris et contrastés pour le podium
    const podiumStyles = [
        { border: "border-amber-500/50", shadow: "shadow-[0_0_40px_rgba(245,158,11,0.15)]", glow: "bg-amber-500/20", text: "text-amber-400" },
        { border: "border-cyan-500/50", shadow: "shadow-[0_0_40px_rgba(6,182,212,0.15)]", glow: "bg-cyan-500/20", text: "text-cyan-400" },
        { border: "border-purple-500/50", shadow: "shadow-[0_0_40px_rgba(168,85,247,0.15)]", glow: "bg-purple-500/20", text: "text-purple-400" }
    ];

    return (
        <div className="container pt-10 pb-20">
            <Headers />

            <section className="text-center mb-16">
                <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                    TOP 100 ZEPHYR
                </h1>
                <p className="text-[var(--text-muted)] tracking-[0.2em] uppercase text-xs font-bold">L'élite de la communauté</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 px-4">
                {podium?.map((torrent, idx) => {
                    const typeStyle = TYPE_STYLES[torrent.type] || TYPE_STYLES['Default'];

                    return (
                        <div key={torrent.id}
                            className={`relative group backdrop-blur-3xl border-2 ${podiumStyles[idx].border} rounded-[45px] p-8 bg-black/40 shadow-2xl`}>

                            {/* Lueur dynamique basée sur le TYPE de contenu */}
                            <div className={`absolute -top-5 -left-5 w-32 h-32 rounded-full blur-[70px] ${typeStyle.bg.replace('/10', '/30')} opacity-40`}></div>

                            {/* Badge de catégorie flottant */}
                            <div className={`absolute top-8 right-20 ${typeStyle.bg} ${typeStyle.color} ${typeStyle.border} border px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest`}>
                                {torrent.type}
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${podiumStyles[idx].text} shadow-inner`}>
                                        {idx === 0 ? <Trophy size={32} /> : <Medal size={32} />}
                                    </div>
                                    <span className="text-6xl font-black opacity-20 italic select-none">#{idx + 1}</span>
                                </div>

                                <Link to={`/details/${torrent.id}`} className="block text-2xl font-bold text-white mb-4 leading-tight hover:text-[var(--primary-accent)] transition-colors">
                                    {torrent.name}
                                </Link>

                                <div className="space-y-4 bg-white/5 rounded-3xl p-5 border border-white/5">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-400 font-medium">Activité</span>
                                        <TrendLine color={idx === 0 ? "#f59e0b" : idx === 1 ? "#06b6d4" : "#a855f7"} />
                                    </div>
                                    <div className="flex gap-6 pt-2">
                                        <div className="flex flex-col">
                                            <span className={`text-lg font-bold ${podiumStyles[idx].text}`}>{torrent.se}</span>
                                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Seeds</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-lg text-white font-bold">{torrent.size}</span>
                                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Poids</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* LISTE RESTANTE */}
            <main className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] border-b border-white/5">
                            <th className="p-8 font-bold">Rang</th>
                            <th className="p-8 font-bold">Fichier</th>
                            <th className="p-8 font-bold text-center">Tendance</th>
                            <th className="p-8 font-bold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {theRest?.map((torrent, idx) => (
                            <tr key={torrent.id} className="group hover:bg-white/[0.03] transition-colors border-b border-white/[0.02] last:border-none">
                                <td className="p-8 font-mono text-white/30 group-hover:text-[var(--primary-accent)] font-black text-lg">
                                    {idx + 4}
                                </td>
                                <td className="p-8">
                                    <Link to={`/details/${torrent.id}`} className="text-white font-semibold block hover:text-[var(--primary-accent)] transition-colors mb-1">
                                        {torrent.name}
                                    </Link>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded border border-white/5 text-gray-400 uppercase">{torrent.type}</span>
                                        <span className="text-[10px] text-gray-500 italic">par {torrent.uploader}</span>
                                    </div>
                                </td>
                                <td className="p-8 text-center">
                                    <div className="flex items-center justify-center gap-4 bg-black/20 rounded-full py-2 px-4 w-fit mx-auto border border-white/5">
                                        <TrendLine color="var(--primary-accent)" />
                                        <span className="text-[var(--primary-accent)] font-black text-xs">{torrent.se}</span>
                                    </div>
                                </td>
                                <td className="p-8 text-right">
                                    <button className="text-[var(--primary-accent)] p-3 rounded-2xl border border-[var(--primary-accent)]/20 hover:bg-[var(--primary-accent)] hover:text-black transition-all shadow-lg hover:shadow-[var(--primary-accent)]/20">
                                        <Magnet size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}