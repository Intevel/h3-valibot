import { addServerImports, createResolver, defineNuxtModule } from '@nuxt/kit'
import '@nuxt/schema'

export default defineNuxtModule({
  meta: {
    name: 'h3-valibot',
  },
  defaults: {},
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)
    addServerImports([
      {
        name: 'useSafeValidatedBody',
        from: resolve('./core'),
      },
      {
        name: 'useSafeValidatedParams',
        from: resolve('./core'),
      },
      {
        name: 'useSafeValidatedQuery',
        from: resolve('./core'),
      },
      {
        name: 'useValidatedBody',
        from: resolve('./core'),
      },
      {
        name: 'useValidatedParams',
        from: resolve('./core'),
      },
      {
        name: 'useValidatedQuery',
        from: resolve('./core'),
      },
    ])
    addServerImports([
      {
        name: 'v',
        from: resolve('./core'),
      },
      {
        name: 'vh',
        from: resolve('./core'),
      },
    ])
  },
})
