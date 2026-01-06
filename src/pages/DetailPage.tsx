import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Download, Loader2, Magnet } from 'lucide-react';
import { useTorrent } from "../services/torrent.ts";
import { Headers } from "../components/Headers.tsx";
import { DetailDescription } from "../components/detail/detailDescription.tsx";
import { DetailFiles } from '../components/detail/DetailFiles.tsx';
import { DetailComments } from '../components/detail/comments/DetailComments.tsx';

// On définit un type simple pour les onglets
type TabType = 'desc' | 'files' | 'coms';

export default function DetailPage() {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<TabType>('desc');
    const { data: torrent, isLoading, error } = useTorrent(id);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-[var(--primary-accent)]">
                <Loader2 className="animate-spin w-10 h-10" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center pt-20">Erreur : {error.message}</div>;
    }

    return (
        <div className="container pt-10 pb-20">
            <Headers />
            <div className="flex justify-center pt-10 pb-10 min-h-screen">
                <main
                    className="w-[90%] max-w-[1000px] bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--glass-border)] rounded-[30px] p-10 shadow-2xl animate-[fadeIn_0.5s_ease-out]">

                    <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
                        <Link to="/" className="hover:text-[var(--primary-accent)]">Accueil</Link>
                        <ChevronRight size={14} />
                        <span>Vidéo</span>
                        <ChevronRight size={14} />
                        <span className="text-white">Films HD</span>
                    </nav>

                    <header
                        className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-[var(--glass-border)] pb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {id} - {torrent?.name}
                            </h1>
                            <div
                                className="inline-flex items-center gap-2 bg-fuchsia-500/10 px-3 py-1.5 rounded-xl border border-fuchsia-500/30 text-fuchsia-400 text-sm">
                                <span>☠️</span>
                                <span>Uploadé par <strong>{torrent?.uploader}</strong></span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button
                                className="flex-1 px-6 py-3 bg-[var(--primary-accent)] text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] transition">
                                <Magnet size={20} /> Obtenir le Magnet
                            </button>
                            <button
                                className="flex-1 px-6 py-3 border border-white/20 text-white font-medium rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition">
                                <Download size={20} /> .Torrent
                            </button>
                        </div>
                    </header>

                    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {[
                            { label: 'Taille', val: `${torrent?.size} GB` },
                            { label: 'Seeders', val: `${torrent?.se}`, color: 'text-[var(--primary-accent)]' },
                            { label: 'Leechers', val: `${torrent?.le}`, color: 'text-[var(--danger)]' },
                            { label: 'Date', val: torrent?.date }
                        ].map((stat, idx) => (
                            <div key={idx} className="bg-black/30 p-4 rounded-2xl border border-white/5 text-center">
                                <span
                                    className="text-xs text-[var(--text-muted)] uppercase tracking-wider block mb-1">{stat.label}</span>
                                <span className={`text-xl font-bold ${stat.color || 'text-white'}`}>{stat.val}</span>
                            </div>
                        ))}
                    </section>

                    <div className="mb-6 border-b border-[var(--glass-border)] flex gap-6">
                        {[
                            { id: 'desc', label: 'Description' },
                            { id: 'files', label: 'Fichiers (2)' },
                            { id: 'coms', label: 'Avis' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`pb-4 text-sm font-medium transition relative ${activeTab === tab.id ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'}`}
                            >
                                {tab.label}
                                {activeTab === tab.id && <span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary-accent)] shadow-[0_-2px_10px_var(--primary-accent)]"></span>}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'desc' && (
                        <DetailDescription torrent={torrent}></DetailDescription>
                    )}
                    {activeTab === 'files' && (
                        <DetailFiles files={torrent?.files}></DetailFiles>
                    )}
                    {activeTab === 'coms' && (
                        <DetailComments></DetailComments>
                    )}
                </main>
            </div>
        </div>
    );
}