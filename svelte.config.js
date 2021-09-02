import vercel from '@sveltejs/adapter-vercel'
import node from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte',
        adapter: process.env.VERCEL ? vercel() : node(),
        vite: {
            optimizeDeps: {
                exclude: ['@types/marked'],
            },
        },
    },
}

export default config
