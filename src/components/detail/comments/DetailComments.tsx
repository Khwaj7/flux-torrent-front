import { DetailAddComment } from "./DetailAddComment"

export const DetailComments = () => {

    return (
        <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            {/* Barre de stats rapide pour les avis */}
            <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="text-xl font-semibold text-white">Commentaires de la communauté</h3>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <span className="text-[var(--primary-accent)] font-bold">4.8</span>
                    <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < 4 ? "opacity-100" : "opacity-30"}>★</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Liste des avis */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {[
                    { user: "FoxMaster", date: "Il y a 2h", note: 5, text: "Super qualité, merci pour l'upload ! Le débit est excellent." },
                    { user: "DarkShadow", date: "Hier", note: 4, text: "Fichier propre, mais attention les sous-titres sont en décalé de 1s au milieu du film." },
                    { user: "ReactDev", date: "3 jours", note: 5, text: "Top ! Rien à dire, ça seed fort." }
                ].map((com, i) => (
                    <div key={i} className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 p-5 rounded-[24px] transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center font-bold text-white border border-white/20">
                                    {com.user[0]}
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">{com.user}</h4>
                                    <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-tighter">{com.date}</span>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, starIdx) => (
                                    <div key={starIdx} className={`w-1.5 h-1.5 rounded-full ${starIdx < com.note ? 'bg-[var(--primary-accent)]' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed pl-1">
                            {com.text}
                        </p>
                    </div>
                ))}
            </div>

            <DetailAddComment></DetailAddComment>
        </div>
    )
}