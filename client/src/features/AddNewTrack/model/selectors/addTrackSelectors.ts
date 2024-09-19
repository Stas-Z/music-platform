import { StateSchema } from '@/src/app/providers/StoreProvider'

export const getAddTrackIsLoading = (state: StateSchema) =>
    state.addTrack?.isLoading || false
export const getAddTrackOnSucces = (state: StateSchema) =>
    state.addTrack?.onSucces || false
export const getAddTrackError = (state: StateSchema) =>
    state.addTrack?.error || ''
