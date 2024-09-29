import { StateSchema } from '@/src/app/providers/StoreProvider'

export const getArtistList = (state: StateSchema) =>
    state.artistPage.artists || []
