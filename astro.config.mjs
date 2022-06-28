import { defineConfig } from 'astro/config'
// import preact from '@astrojs/preact'
// import worker, { cloudflare } from 'astro-service-worker/adapter'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
	site: 'https://vournalist.com',
	adapter: cloudflare(),
	integrations: [
		// preact(), 
		// worker(cloudflare)
	],
})