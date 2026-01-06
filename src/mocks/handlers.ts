import {delay, http, HttpResponse} from 'msw'
import {Torrent} from '../types'

const db: Torrent[] = [
    {
        id: 1,
        name: 'Je suis une légende',
        size: '2.4 GB',
        uploader: 'BlenderFdn',
        date: 'Auj.',
        se: 4205,
        le: 12,
        type: 'Vidéo',
        format: 'Matroska (MKV)',
        resolution: '3840 x 2160 (4K)',
        description: 'Robert Neville était un brillant scientifique, mais même lui n\'a pu endiguer le terrible virus, créé de la main de l\'homme, qui a dévasté la race humaine. Pour une raison inconnue, Neville est immunisé et reste à ce jour le dernier être humain vivant dans ce qui reste de New York et peut-être du monde. Depuis trois ans, il envoie des messages de détresse à qui voudra bien l\'entendre.\n',
        files: [
            {
                id: 1,
                name: 'description',
                extension: '.NFO',
                size: '2.3 MB'
            },
            {
                id: 2,
                name: 'jesuisunelegende',
                extension: '.MKV',
                size: '4.5 GB'
            }
        ]
    },
    {
        id: 2,
        name: 'Ubuntu 24.04 LTS',
        size: '4.8 GB',
        uploader: 'Canonical',
        date: 'Hier',
        se: 8502,
        le: 340,
        type: 'App'
    },
    {
        id: 3,
        name: 'Arch Linux Core',
        size: '800 MB',
        uploader: 'ArchUser',
        date: '01-01',
        se: 15000,
        le: 200,
        type: 'App'
    },
]

export const handlers = [
    // 1. Route pour la LISTE (GET /api/torrents)
    http.get('/api/torrents', async () => {
        await delay(800) // On simule un réseau un peu lent (0.8s) pour voir tes loaders !
        return HttpResponse.json(db)
    }),

    // 2. Route pour le DÉTAIL (GET /api/torrents/:id)
    http.get('/api/torrents/:id', async ({params}) => {
        await delay(500)

        const {id} = params
        const torrent = db.find(t => t.id === Number(id))

        if (!torrent) {
            return new HttpResponse(null, {status: 404})
        }

        return HttpResponse.json(torrent)
    }),
]