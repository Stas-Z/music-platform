import { StateSchema } from '@/src/app/providers/StoreProvider'

export const getCurrentArtistSelector = (state: StateSchema) =>
    state.artist.artist || null
