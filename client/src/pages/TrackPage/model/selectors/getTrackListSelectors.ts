import { StateSchema } from '@/src/app/providers/StoreProvider'
import { buildSelector } from '@/src/shared/lib/store'

export const [useTrackPageValue, getTrackPageValue] = buildSelector(
    (state: StateSchema) => state.trackPage,
)

export const getTrackList = (state: StateSchema) => state.trackPage.tracks || []
