import { StateSchema } from '@/src/app/providers/StoreProvider'

export const getTrackList = (state: StateSchema) => state.trackPage.tracks || []
