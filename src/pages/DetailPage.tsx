import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Download, Loader2, Magnet, Play } from 'lucide-react'; // J'ai ajouté 'Play' pour le style
import { useTorrent } from "../services/torrent.ts";
import { Headers } from "../components/Headers.tsx";
import { DetailFiles } from '../components/detail/DetailFiles.tsx';
import { DetailComments } from '../components/detail/comments/DetailComments.tsx';
import { DetailDescription } from '../components/detail/DetailDescription.tsx';

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
                <main className="w-[90%] max-w-[1000px] bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--glass-border)] rounded-[30px] p-8 md:p-10 shadow-2xl animate-[fadeIn_0.5s_ease-out]">

                    {/* Fil d'ariane */}
                    <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
                        <Link to="/" className="hover:text-[var(--primary-accent)]">Accueil</Link>
                        <ChevronRight size={14} />
                        <span>{torrent?.type || 'Fichier'}</span>
                        <ChevronRight size={14} />
                        <span className="text-white truncate max-w-[200px]">{torrent?.name}</span>
                    </nav>

                    {/* HEADER AVEC IMAGE */}
                    <header className="flex flex-col md:flex-row gap-8 mb-10 border-b border-[var(--glass-border)] pb-10">

                        {/* COLONNE GAUCHE : IMAGE */}
                        <div className="w-full md:w-[280px] shrink-0 group perspective-1000">
                            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 group-hover:transform group-hover:scale-[1.02] transition duration-500">
                                {/* Si pas d'image, on met un placeholder coloré */}
                                {torrent?.image ? (
                                    <img
                                        src={torrent.image}
                                        alt={torrent.name}
                                        className="w-full h-auto object-cover aspect-[2/3]"
                                    />
                                ) : (
                                    <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-gray-500">
                                        Pas d'image
                                    </div>
                                )}

                                {/* Overlay brillance */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                    <span className="bg-[var(--primary-accent)] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Play size={10} fill="black" /> Aperçu
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* COLONNE DROITE : INFOS & BOUTONS */}
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-tight">
                                    {torrent?.name}
                                </h1>

                                <div className="flex flex-wrap gap-3 mb-6">
                                    <div className="inline-flex items-center gap-2 bg-fuchsia-500/10 px-3 py-1.5 rounded-lg border border-fuchsia-500/30 text-fuchsia-400 text-sm">
                                        <span>☠️</span>
                                        <span>Uploadé par <strong>{torrent?.uploader}</strong></span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 text-sm">
                                        <span>💾 {torrent?.size}</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 text-sm">
                                        <span>📅 {torrent?.date}</span>
                                    </div>
                                </div>

                                {/* Stats rapides intégrées */}
                                <div className="flex gap-6 mb-8 p-4 bg-black/20 rounded-2xl border border-white/5 w-fit">
                                    <div className="text-center px-2">
                                        <div className="text-[var(--primary-accent)] font-bold text-xl">{torrent?.se}</div>
                                        <div className="text-[10px] uppercase text-[var(--text-muted)]">Seeds</div>
                                    </div>
                                    <div className="w-px bg-white/10"></div>
                                    <div className="text-center px-2">
                                        <div className="text-red-400 font-bold text-xl">{torrent?.le}</div>
                                        <div className="text-[10px] uppercase text-[var(--text-muted)]">Leechs</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <button className="flex-1 px-8 py-4 bg-[var(--primary-accent)] text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,255,157,0.4)] transition-all">
                                    <Magnet size={24} />
                                    <span className="text-lg">Magnet Link</span>
                                </button>
                                <button className="flex-1 px-8 py-4 border border-white/20 bg-white/5 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                                    <Download size={24} />
                                    <span className="text-lg">Télécharger .torrent</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* ONGLETS */}
                    <div className="mb-6 border-b border-[var(--glass-border)] flex gap-8">
                        {[
                            { id: 'desc', label: 'Description' },
                            { id: 'files', label: `Fichiers (${torrent?.files?.length || 0})` },
                            { id: 'coms', label: 'Avis Communauté' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`pb-4 text-sm font-bold tracking-wide transition relative ${activeTab === tab.id ? 'text-white' : 'text-[var(--text-muted)] hover:text-white'}`}
                            >
                                {tab.label}
                                {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary-accent)] shadow-[0_-2px_10px_var(--primary-accent)]"></span>}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[300px]">
                        {activeTab === 'desc' && torrent && <DetailDescription torrent={torrent} />}
                        {activeTab === 'files' && torrent?.files && <DetailFiles files={torrent.files} />}
                        {activeTab === 'coms' && <DetailComments />}
                    </div>
                </main>
            </div>
        </div>
    );
}