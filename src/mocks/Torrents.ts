import { Torrent } from "../types";

export const torrents: Torrent[] = [
    {
        id: 1,
        name: 'Je suis une légende',
        // Source : Wikimedia (Stable)
        image: 'https://upload.wikimedia.org/wikipedia/en/d/df/I_am_legend_teaser.jpg',
        size: '2.4 GB',
        uploader: 'BlenderFdn',
        date: 'Auj.',
        se: 4205,
        le: 12,
        type: 'Vidéo',
        format: 'Matroska (MKV)',
        resolution: '3840 x 2160 (4K)',
        description: 'Robert Neville était un brillant scientifique, mais même lui n\'a pu endiguer le terrible virus...',
        files: [
            { id: 1, name: 'description', extension: '.NFO', size: '2.3 MB' },
            { id: 2, name: 'jesuisunelegende', extension: '.MKV', size: '4.5 GB' }
        ]
    },
    {
        id: 2,
        name: 'Grand Theft Auto VI - Leaked Build',
        // Source : Wikimedia (Logo GTA officiel, plus stable que les artworks qui changent)
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Grand_Theft_Auto_VI_logo.svg/800px-Grand_Theft_Auto_VI_logo.svg.png',
        size: '124.8 GB',
        uploader: 'DODI-Repacks',
        date: 'Hier',
        se: 12540,
        le: 840,
        type: 'Jeux',
        format: 'ISO / Executable',
        resolution: 'Varies',
        description: 'Version de développement fuitée. Contient les assets de base de Vice City.',
        files: [{ id: 1, name: 'Setup', extension: '.exe', size: '124 GB' }]
    },
    {
        id: 3,
        name: 'Oppenheimer (2023)',
        // Source : Wikimedia
        image: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
        size: '18.2 GB',
        uploader: 'YTS_Official',
        date: '2 j.',
        se: 8500,
        le: 45,
        type: 'Vidéo',
        format: 'MKV (HEVC)',
        resolution: '2160p (4K)',
        description: 'Le film biographique de Christopher Nolan sur le père de la bombe atomique.',
        files: [{ id: 1, name: 'Oppenheimer.2160p', extension: '.mkv', size: '18.1 GB' }]
    },
    {
        id: 4,
        name: 'Adobe Creative Cloud 2025',
        // Source : Wikimedia
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Adobe_Creative_Cloud_rainbow_icon.svg/1024px-Adobe_Creative_Cloud_rainbow_icon.svg.png',
        size: '32.5 GB',
        uploader: 'm0nkrus',
        date: 'Auj.',
        se: 5200,
        le: 110,
        type: 'App',
        format: 'Installer',
        resolution: 'N/A',
        description: 'Pack complet incluant Photoshop, Premiere Pro, et After Effects.',
        files: [{ id: 1, name: 'Adobe_Pack_2025', extension: '.iso', size: '32.5 GB' }]
    },
    {
        id: 5,
        name: 'Daft Punk - Random Access Memories',
        // Source : Wikimedia
        image: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg',
        size: '1.4 GB',
        uploader: 'Audiophile99',
        date: '5 j.',
        se: 3100,
        le: 8,
        type: 'Audio',
        format: 'FLAC (Lossless)',
        resolution: '24-bit / 96kHz',
        description: 'Édition spéciale anniversaire en haute fidélité.',
        files: [{ id: 1, name: '01-Give_Life_Back_to_Music', extension: '.flac', size: '95 MB' }]
    },
    {
        id: 6,
        name: 'Eva Elfie - Private Session',
        // Source : Unsplash (Modèle Fashion/Neon - SFW mais dans le thème)
        image: 'https://imgs.search.brave.com/xwfYK6xfWq7I4gaLoFZrC22EN-xfGhr0k3DiCLfuwU4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJkbWVkaWEuY29t/L3RncHgvdGh1bWJz/LzI2MzIyNi5qcGc',
        size: '400 MB',
        uploader: 'PornStarPremium',
        date: 'Auj.',
        se: 9800,
        le: 320,
        type: 'Adulte',
        format: 'MP4',
        resolution: '4K',
        description: 'Séance exclusive pour les abonnés VIP.',
        files: [{ id: 1, name: 'Gallery', extension: '.zip', size: '400 MB' }]
    },
    {
        id: 7,
        name: 'Elden Ring: Shadow of the Erdtree',
        // Source : Wikimedia (Box Art)
        image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',
        size: '48.3 GB',
        uploader: 'FitGirl',
        date: '3 j.',
        se: 15600,
        le: 950,
        type: 'Jeux',
        format: 'Repack',
        resolution: 'N/A',
        description: 'L\'extension tant attendue. Version compressée sans perte de qualité.',
        files: [{ id: 1, name: 'ER-Shadow-Pack', extension: '.bin', size: '48 GB' }]
    },
    {
        id: 8,
        name: 'Windows 11 Pro Lite',
        // Source : Wikimedia
        image: 'https://upload.wikimedia.org/wikipedia/en/e/ea/Windows_11_cover.jpg',
        size: '3.1 GB',
        uploader: 'GhostSpectre',
        date: '1 sem.',
        se: 4500,
        le: 50,
        type: 'App',
        format: 'ISO',
        resolution: 'N/A',
        description: 'Version optimisée de Windows 11 sans télémétrie.',
        files: [{ id: 1, name: 'Win11_Pro_Lite', extension: '.iso', size: '3.1 GB' }]
    },
    {
        id: 9,
        name: 'The Mandalorian - Saison 3',
        // Source : Wikimedia
        image: 'https://upload.wikimedia.org/wikipedia/en/8/87/The_Mandalorian_season_3_poster.jpg',
        size: '22.4 GB',
        uploader: 'DisneyPlusRip',
        date: '2 sem.',
        se: 2100,
        le: 120,
        type: 'Vidéo',
        format: 'MKV',
        resolution: '1080p',
        description: 'L\'intégrale de la saison 3. Multi-langues (VFF/VO).',
        files: [{ id: 1, name: 'Mando_S03_Full', extension: '.zip', size: '22.4 GB' }]
    },
    {
        id: 10,
        name: 'Riley Reid Collection',
        // Source : Unsplash (Portrait esthétique)
        image: 'https://imgs.search.brave.com/KfbsB4d04YOvkmBLJBk3k7X5tG7vjK5PgBIWTrZ4OKk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJkbWVkaWEuY29t/L3RncHgvdGh1bWJz/LzI2MjQ4NC5qcGc',
        size: '12.8 GB',
        uploader: 'ClassicX',
        date: 'Auj.',
        se: 11200,
        le: 400,
        type: 'Adulte',
        format: 'MP4',
        resolution: '1080p',
        description: 'Compilation des scènes les plus populaires.',
        files: [{ id: 1, name: 'Riley_Reid_BestOf', extension: '.mp4', size: '12.8 GB' }]
    }
];