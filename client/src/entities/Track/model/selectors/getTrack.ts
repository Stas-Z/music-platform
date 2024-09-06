import { StateSchema } from '@/src/app/providers/StoreProvider'
import { buildSelector } from '@/src/shared/lib/store'

export const [useTrackValue, getTrackValue] = buildSelector(
    (state: StateSchema) => state.track,
)

export const getActiveTrack = (state: StateSchema) => state.track.activeTrack
export const getCurrentTime = (state: StateSchema) => state.track.currentTime
export const getDuration = (state: StateSchema) => state.track.duration
export const getVolume = (state: StateSchema) => state.track.volume
export const getPause = (state: StateSchema) => state.track.pause
