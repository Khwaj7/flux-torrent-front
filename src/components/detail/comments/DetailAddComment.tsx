import { ChevronRight } from 'lucide-react';

export const DetailAddComment = () => {
    return (
        <div className="mt-8 relative">
            <textarea
                placeholder="Ajouter un avis..."
                className="w-full bg-black/40 border border-[var(--glass-border)] rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-[var(--primary-accent)] transition-colors resize-none h-24"
            />
            <button className="absolute bottom-4 right-4 bg-white/10 hover:bg-[var(--primary-accent)] hover:text-black p-2 rounded-xl transition-all group">
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    )
}