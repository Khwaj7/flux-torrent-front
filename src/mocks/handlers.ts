import { delay, http, HttpResponse } from 'msw'
import { torrents } from './Torrents'

export const handlers = [
    // 1. Route pour la LISTE (GET /api/torrents)
    http.get('/api/torrents', async () => {
        await delay(800) // On simule un réseau un peu lent (0.8s) pour voir tes loaders !
        return HttpResponse.json(torrents)
    }),

    // 2. Route pour le DÉTAIL (GET /api/torrents/:id)
    http.get('/api/torrents/:id', async ({ params }) => {
        await delay(500)

        const { id } = params
        const torrent = torrents.find(t => t.id === Number(id))

        if (!torrent) {
            return new HttpResponse(null, { status: 404 })
        }

        return HttpResponse.json(torrent)
    }),
]