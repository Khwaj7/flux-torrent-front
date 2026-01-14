import {useState, useMemo, useEffect} from 'react';
import {Torrent} from "../types.ts";

const ITEMS_PER_PAGE = 20;

export const useTorrentSearch = (torrents: Torrent[] | undefined) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tout');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredTorrents = useMemo(() => {
        if (!torrents) return [];
        return torrents.filter(torrent => {
            const term = searchTerm.toLowerCase();
            const matchesSearch = torrent.name.toLowerCase().includes(term) ||
                torrent.uploader.toLowerCase().includes(term);
            const matchesCategory = activeCategory === 'Tout' || torrent.type === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [torrents, searchTerm, activeCategory]);

    const totalPages = Math.ceil(filteredTorrents.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedResults = filteredTorrents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const goToNextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages));
    const goToPrevPage = () => setCurrentPage(p => Math.max(p - 1, 1));

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeCategory]);

    return {
        activeCategory,
        currentPage,
        goToNextPage,
        goToPrevPage,
        isEmpty: filteredTorrents.length === 0 && (torrents?.length || 0) > 0,
        results: paginatedResults,
        resetSearch: () => {
            setSearchTerm('');
            setActiveCategory('Tout');
            setCurrentPage(1);
        },
        searchTerm,
        setSearchTerm,
        setActiveCategory,
        totalResults: filteredTorrents.length,
        totalPages,
    };
};