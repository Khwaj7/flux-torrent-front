import { useState, useMemo } from "react";
import { Torrent } from "../services/torrent";

export const useTorrentSearch = (torrents: Torrent[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tout");

  // useMemo mémorise le résultat du filtre.
  // Il ne recalcule que si 'torrents', 'searchTerm' ou 'activeCategory' change.
  const filteredTorrents = useMemo(() => {
    if (!torrents) return [];

    return torrents.filter((torrent) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        torrent.name.toLowerCase().includes(term) ||
        torrent.uploader.toLowerCase().includes(term); // J'ai ajouté la recherche par uploader aussi !

      const matchesCategory =
        activeCategory === "Tout" || torrent.type === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [torrents, searchTerm, activeCategory]);

  // Fonctions utilitaires pour reset
  const resetSearch = () => {
    setSearchTerm("");
    setActiveCategory("Tout");
  };

  return {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    results: filteredTorrents,
    resetSearch,
    isEmpty: filteredTorrents.length === 0 && torrents && torrents.length > 0,
  };
};
