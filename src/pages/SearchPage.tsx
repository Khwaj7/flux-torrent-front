import {Link} from "react-router-dom";
import {Loader2, Magnet, Search, Frown, ChevronLeft, ChevronRight} from "lucide-react"; // Ajout des flèches
import {useTorrents} from "../services/torrent.ts";
import {Headers} from "../components/Headers.tsx";
import {TYPE_STYLES} from "../styles/TypeStyles.ts";
import {useTorrentSearch} from "../hooks/useTorrentSearch.ts";

export default function SearchPage() {
    const {data: torrents, isLoading, error} = useTorrents();

    // Le hook gère maintenant la recherche, les filtres ET la pagination
    const search = useTorrentSearch(torrents);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-[var(--primary-accent)]">
                <Loader2 className="animate-spin w-10 h-10"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center pt-20">
                Erreur : {error.message}
            </div>
        );
    }

    return (
        <div className="container pt-10 pb-20">
            <Headers/>

            <section className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
                    Qu'allons-nous découvrir ?
                </h1>

                {/* BARRE DE RECHERCHE */}
                <div className="relative max-w-2xl mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Rechercher des torrents..."
                        value={search.searchTerm}
                        onChange={(e) => search.setSearchTerm(e.target.value)}
                        className="w-full py-5 pl-8 pr-16 rounded-full bg-black/30 backdrop-blur-md border border-[var(--glass-border)] text-white text-lg focus:outline-none focus:border-[var(--primary-accent)] focus:shadow-[0_0_20px_rgba(0,255,157,0.2)] transition"
                    />
                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--primary-accent)] rounded-full flex items-center justify-center hover:scale-110 transition text-black">
                        <Search size={24} strokeWidth={3}/>
                    </button>
                </div>

                {/* FILTRES CATEGORIES */}
                <div className="flex justify-center gap-3 flex-wrap">
                    {["Tout", "Audio", "Vidéo", "App", "Jeux", "Adulte"].map(
                        (filter, idx) => (
                            <button
                                key={idx}
                                onClick={() => search.setActiveCategory(filter)}
                                className={`px-6 py-2 rounded-full border transition-all ${
                                    search.activeCategory === filter
                                        ? "bg-[var(--glass-highlight)] border-[var(--primary-accent)] text-white shadow-[0_0_15px_rgba(0,255,157,0.3)]"
                                        : "border-[var(--glass-border)] text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                {filter}
                            </button>
                        )
                    )}
                </div>
            </section>

            <main
                className="bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl p-8 shadow-2xl overflow-x-auto min-h-[400px] flex flex-col justify-between">
                {search.isEmpty ? (
                    <div
                        className="flex flex-col items-center justify-center py-20 text-[var(--text-muted)] animate-[fadeIn_0.5s]">
                        <Frown size={64} className="mb-4 opacity-50"/>
                        <p className="text-xl">
                            Aucun résultat trouvé pour "{search.searchTerm}"
                        </p>
                        <button
                            onClick={search.resetSearch}
                            className="mt-4 text-[var(--primary-accent)] hover:underline"
                        >
                            Réinitialiser la recherche
                        </button>
                    </div>
                ) : (
                    <>
                        <table className="w-full border-collapse text-left mb-8">
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
                            {/* On affiche seulement les résultats de la page courante (20 items max) */}
                            {search.results.map((torrent) => {
                                const style = TYPE_STYLES[torrent.type] || TYPE_STYLES["Default"];

                                return (
                                    <tr
                                        key={torrent.id}
                                        className="group hover:bg-white/5 transition rounded-xl"
                                    >
                                        <td className="py-4 pl-4 border-b border-white/5 group-last:border-none">
                                            <Link
                                                to={`/details/${torrent.id}`}
                                                className="block text-base font-semibold text-white mb-1 hover:text-[var(--primary-accent)] transition"
                                            >
                                                {torrent.name}
                                            </Link>
                                            <div className="flex gap-2 items-center text-xs text-[var(--text-muted)]">
                          <span
                              className={`${style.bg} ${style.color} ${style.border} px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider`}
                          >
                            {torrent.type}
                          </span>
                                                <span>{torrent.size}</span> •{" "}
                                                <span>
                            Par{" "}
                                                    <strong className="text-gray-300">
                              {torrent.uploader}
                            </strong>
                          </span>
                                            </div>
                                        </td>
                                        <td className="py-4 border-b border-white/5 hidden md:table-cell text-[var(--text-muted)]">
                                            {torrent.date}
                                        </td>
                                        <td className="py-4 border-b border-white/5 text-[var(--primary-accent)] font-bold">
                                            {torrent.se}
                                        </td>
                                        <td className="py-4 border-b border-white/5 text-[var(--danger)] font-bold">
                                            {torrent.le}
                                        </td>
                                        <td className="py-4 border-b border-white/5">
                                            <button
                                                className="text-[var(--primary-accent)] border border-[var(--primary-accent)] px-3 py-1.5 rounded-lg text-xs hover:bg-[var(--primary-accent)] hover:text-black transition flex items-center gap-1">
                                                <Magnet size={14}/> Magnet
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

                        {/* --- ZONE DE PAGINATION --- */}
                        {search.totalResults > 0 && (
                            <div
                                className="flex items-center justify-between pt-4 border-t border-white/5 animate-[fadeIn_0.5s]">
                                <div className="text-xs text-[var(--text-muted)] hidden sm:block">
                                    Affichage de <strong>{search.results.length}</strong> sur{" "}
                                    <strong>{search.totalResults}</strong> résultats
                                </div>

                                <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                                    <button
                                        onClick={search.goToPrevPage}
                                        disabled={search.currentPage === 1}
                                        className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
                                    >
                                        <ChevronLeft size={20}/>
                                    </button>

                                    <span className="px-3 text-sm font-mono text-[var(--primary-accent)] font-bold">
                    Page {search.currentPage} / {search.totalPages}
                  </span>

                                    <button
                                        onClick={search.goToNextPage}
                                        disabled={search.currentPage === search.totalPages}
                                        className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white"
                                    >
                                        <ChevronRight size={20}/>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}