import { http, HttpResponse, delay } from 'msw'
import { Torrent } from '../types'

// Données fictives (tu peux en mettre plein)
const db: Torrent[] = [
    { id: 1, name: 'Big Buck Bunny 4K', size: '2.4 GB', uploader: 'BlenderFdn', date: 'Auj.', se: 4205, le: 12, type: 'Vidéo' },
    { id: 2, name: 'Ubuntu 24.04 LTS', size: '4.8 GB', uploader: 'Canonical', date: 'Hier', se: 8502, le: 340, type: 'App' },
    { id: 3, name: 'Arch Linux Core', size: '800 MB', uploader: 'ArchUser', date: '01-01', se: 15000, le: 200, type: 'App' },
]

export const handlers = [
    // 1. Route pour la LISTE (GET /api/torrents)
    http.get('/api/torrents', async () => {
        await delay(800) // On simule un réseau un peu lent (0.8s) pour voir tes loaders !
        return HttpResponse.json(db)
    }),

    // 2. Route pour le DÉTAIL (GET /api/torrents/:id)
    http.get('/api/torrents/:id', async ({ params }) => {
        await delay(500)

        const { id } = params
        const torrent = db.find(t => t.id === Number(id))

        if (!torrent) {
            return new HttpResponse(null, { status: 404 })
        }

        return HttpResponse.json(torrent)
    }),
]