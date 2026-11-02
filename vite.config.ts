import { defineConfig, type Plugin } from 'vite'
import { renderBody, renderHead } from './src/render'

/**
 * The site is one static document rendered from `src/content.ts` at build (and
 * dev) time. Nothing is hydrated: the browser only adds motion and interaction.
 */
function staticSite(): Plugin {
  return {
    name: 'static-site',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace('<!--head-->', renderHead())
          .replace('<!--site-->', renderBody())
      },
    },
  }
}

export default defineConfig({
  // Served from the root of the custom domain (prashantnavsariwala.in).
  base: '/',
  plugins: [staticSite()],
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
    reportCompressedSize: true,
  },
  server: {
    port: 5173,
    open: false,
  },
})
