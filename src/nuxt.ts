import { addServerImports, defineNuxtModule } from '@nuxt/kit'
import '@nuxt/schema'

export default defineNuxtModule({
  meta: {
    name: 'h3-valibot',
  },
  defaults: {},
  async setup(_options, _nuxt) {
    addServerImports([
      {
        name: 'useSafeValidatedBody',
        from: 'h3-valibot',
      },
      {
        name: 'useSafeValidatedParams',
        from: 'h3-valibot',
      },
      {
        name: 'useSafeValidatedQuery',
        from: 'h3-valibot',
      },
      {
        name: 'useValidatedBody',
        from: 'h3-valibot',
      },
      {
        name: 'useValidatedParams',
        from: 'h3-valibot',
      },
      {
        name: 'useValidatedQuery',
        from: 'h3-valibot',
      },
      {
        name: 'vh',
        from: 'h3-valibot',
      },
      {
        name: 'v',
        from: 'h3-valibot',
      },
    ])
  },
})
