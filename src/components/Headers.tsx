import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const Headers = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-3xl mb-12 shadow-2xl">
      <div className="text-2xl font-bold tracking-widest flex items-center gap-2">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-[var(--primary-accent)]"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="text-white">Zephyr</span>
        <span className="text-[var(--primary-accent)] font-light">TORRENT</span>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-white transition text-gray-300">
          Parcourir
        </Link>
        <Link
          to="/top-100"
          className="hover:text-white transition text-[var(--primary-accent)] font-bold"
        >
          Top 100
        </Link>
        <Link
          to="/upload"
          className="flex group items-center hover:text-white transition text-gray-300 gap-2 font-bold"
        >
          <Plus
            size={16}
            className="text-[var(--primary-accent)] group-hover:rotate-90 transition-transform"
          />
          <span>Upload</span>
        </Link>
        <Link to="/login" className="hover:text-white transition text-gray-300">
          Login
        </Link>
      </nav>
    </header>
  );
};
