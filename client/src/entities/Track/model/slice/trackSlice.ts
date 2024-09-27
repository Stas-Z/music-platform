import { PayloadAction } from '@reduxjs/toolkit'
import { ITrack } from '@/src/entities/Track'
import { buildSlice } from '@/src/shared/lib/store'
import { TrackSchema } from '../types/track'
import { fetchTracks } from '../services/fetchTracks/fetchTracks'

const initialState: TrackSchema = {
    activeTrack: null,
    currentTime: 0,
    duration: 0,
    volume: 50,
    pause: true,
    tracks: [],
    error: '',
    isLoading: false,
}
export const trackSlice = buildSlice({
    name: 'track',
    initialState,
    reducers: {
        setPause: (state) => {
            state.pause = true
        },
        setPlay: (state) => {
            state.pause = false
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload
        },
        setActive: (state, action: PayloadAction<ITrack | null>) => {
            state.activeTrack = action.payload
            state.duration = 0
            state.currentTime = 0
            if (action.payload) {
                state.pause = true
            }
        },
    },
})

export const { actions: trackActions } = trackSlice
export const { reducer: trackReducer } = trackSlice
export const { useActions: useTrackActions } = trackSlice
