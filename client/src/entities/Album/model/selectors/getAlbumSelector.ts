import { StateSchema } from '@/src/app/providers/StoreProvider'

export const getCurrentAlbumSelector = (state: StateSchema) =>
    state.album.album || null
