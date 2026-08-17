import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // public/ holds the staged Figma exports. Only the modes that actually read
  // them locally need them bundled; web and review pull from the CDN, so
  // copying ~30MB into dist/ there would be dead weight.
  const usesLocalImages = mode === 'kiosk' || mode === 'localdev'

  return {
    plugins: [svelte()],
    base: env.VITE_BASE_URL || '/',
    publicDir: usesLocalImages ? 'public' : false,
  }
})
