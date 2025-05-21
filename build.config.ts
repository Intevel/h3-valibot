import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    {
      input: './src/core/helpers',
      outDir: './dist/helpers',
      name: 'helpers',
    },
    {
      input: './src/nuxt',
      outDir: './dist/nuxt',
      name: 'nuxt',
    },
  ],
  declaration: true,
  rollup: {
    emitCJS: false,
  },
})
