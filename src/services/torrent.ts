import { useQuery } from '@tanstack/react-query';
import { Torrent } from '../types';

// --- FONCTIONS DE FETCH (Pures JS) ---
// Elles font juste l'appel réseau et renvoient une Promise

const fetchTorrents = async (): Promise<Torrent[]> => {
    const response = await fetch('/api/torrents');
    if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des torrents');
    }
    return response.json();
};

const fetchTorrentById = async (id: string): Promise<Torrent> => {
    const response = await fetch(`/api/torrents/${id}`);
    if (!response.ok) {
        throw new Error('Torrent introuvable');
    }
    return response.json();
};

// --- CUSTOM HOOKS (TanStack Query) ---
// C'est ça que tes composants vont utiliser

export const useTorrents = () => {
    return useQuery({
        queryKey: ['torrents'], // La clé unique du cache pour la liste
        queryFn: fetchTorrents,
    });
};

export const useTorrent = (id: string | undefined) => {
    return useQuery({
        queryKey: ['torrent', id], // Clé unique par ID (ex: ['torrent', '12'])
        queryFn: () => fetchTorrentById(id!), // On lance le fetch
        enabled: !!id, // Ne lance la requête que si l'ID existe
    });
};