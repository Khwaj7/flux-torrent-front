import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
    return {
        plugins: [react()],
        // Si on build (pour le VPS), on utilise /zephyr/
        // Si on développe (npm run dev), on utilise /
        base: command === 'build' ? '/zephyr/' : '/',
    }
})