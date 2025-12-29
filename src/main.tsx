// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'

// Création du client (le cerveau du cache)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Les données restent "fraîches" 5 minutes (pas de re-fetch inutile)
            retry: 1, // Si ça plante, on réessaie 1 seule fois
        },
    },
})

async function enableMocking() {
    const { worker } = await import('./mocks/browser')
    return worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </React.StrictMode>,
    )
})