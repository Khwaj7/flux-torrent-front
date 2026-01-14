import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadCloud,
  FileUp,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Headers } from "../components/Headers.tsx";

export default function AddTorrentPage() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Formulaire basique
  const [formData, setFormData] = useState({
    name: "",
    category: "Vidéo",
    description: "",
    image: "",
  });

  const categories = ["Vidéo", "Jeux", "Audio", "Apps", "Adulte"];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      // Simulation : on pré-remplit le nom avec le nom du fichier
      setFile(droppedFile);
      setFormData({
        ...formData,
        name: droppedFile.name.replace(".torrent", ""),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'upload vers le serveur
    setTimeout(() => {
      setIsLoading(false);
      navigate("/"); // Retour à l'accueil après succès
    }, 2000);
  };

  return (
    <div className="container pt-10 pb-20">
      <Headers />

      <div className="flex justify-center min-h-[80vh]">
        <main className="w-full max-w-2xl">
          <h1 className="text-4xl font-black mb-2 text-white">
            Partager un Torrent
          </h1>
          <p className="text-[var(--text-muted)] mb-8">
            Contribuez à la communauté en ajoutant du contenu.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--glass-border)] rounded-[30px] p-8 shadow-2xl relative overflow-hidden"
          >
            {/* ZONE DE DRAG & DROP */}
            {!file ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`
                                    border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
                                    ${
                                      isDragging
                                        ? "border-[var(--primary-accent)] bg-[var(--primary-accent)]/10 scale-[1.02]"
                                        : "border-white/20 hover:border-white/40 hover:bg-white/5"
                                    }
                                `}
              >
                <div
                  className={`p-4 rounded-full mb-4 transition-colors ${
                    isDragging
                      ? "bg-[var(--primary-accent)] text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <UploadCloud size={40} />
                </div>
                <p className="text-lg font-bold text-white mb-2">
                  Glissez votre fichier .torrent ici
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  ou cliquez pour parcourir vos fichiers
                </p>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFile(e.target.files[0]);
                      setFormData({
                        ...formData,
                        name: e.target.files[0].name.replace(".torrent", ""),
                      });
                    }
                  }}
                />
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between mb-8 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500 text-black p-2 rounded-lg">
                    <FileUp size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-400 text-sm">
                      Fichier prêt à l'envoi
                    </p>
                    <p className="text-white text-sm truncate max-w-[250px]">
                      {file.name}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* CHAMPS DU FORMULAIRE (Visibles seulement si fichier présent) */}
            {file && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom de la release
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[var(--primary-accent)] transition-colors"
                    placeholder="Ex: Matrix.Resurrections.2021.4K.HDR..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Catégorie
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, category: cat })
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                            formData.category === cat
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      URL de l'image (Cover)
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[var(--primary-accent)] transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description / NFO
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[var(--primary-accent)] transition-colors resize-none"
                    placeholder="Détails techniques, synopsis, instructions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 mt-4 bg-[var(--primary-accent)] text-black font-bold text-lg rounded-xl hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <UploadCloud size={24} /> Publier le Torrent
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
