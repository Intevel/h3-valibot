import { addServerImports, defineNuxtModule } from '@nuxt/kit'
import '@nuxt/schema'

export default defineNuxtModule({
  meta: {
    name: 'h3-valibot',
  },
  defaults: {},
  async setup(_options, nuxt) {
    addServerImports([
      {
        name: 'useSafeValidatedBody',
        from: 'h3-valibot',
      },
      {
        name: 'useSafeValidatedInput',
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
        name: 'useValidatedInput',
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

    nuxt.hook('imports:extend', (imports) => {
      imports.push(
        {
          name: 'vh',
          from: 'h3-valibot',
        },
        {
          name: 'v',
          from: 'h3-valibot',
        },
      )
    })
  },
})
