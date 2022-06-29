import { defineConfig } from 'astro/config'
import netlify from '@astrojs/netlify/edge-functions'
// import preact from '@astrojs/preact'
// import worker, { cloudflare } from 'astro-service-worker/adapter/index.js'
// import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
	site: 'https://vournalist.com',
	integrations: [
		netlify({
            dist: new URL('./dist/', import.meta.url)
        }),
	],
})