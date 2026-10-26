import type { RouteObject } from 'react-router'

export const crudRoutes: RouteObject[] = [
  {
    path: 'pokemon',
    lazy: async () => ({
      Component: (await import('../features/crud/pokemon/pokemon-list')).PokemonList
    })
  },
  {
    path: 'pokemon/:name',
    lazy: async () => ({
      Component: (await import('../features/crud/pokemon/pokemon-edit')).PokemonEdit
    })
  },
  {
    path: 'pokemon-species',
    lazy: async () => ({
      Component: (await import('../features/crud/pokemon-species/pokemon-species-list')).PokemonSpeciesList
    })
  },
  {
    path: 'pokemon-species/:name',
    lazy: async () => ({
      Component: (await import('../features/crud/pokemon-species/pokemon-species-edit')).PokemonSpeciesEdit
    })
  },
  {
    path: 'type',
    lazy: async () => ({
      Component: (await import('../features/crud/type/type-list')).TypeList
    })
  },
  {
    path: 'type/:name',
    lazy: async () => ({
      Component: (await import('../features/crud/type/type-edit')).TypeEdit
    })
  }
]
