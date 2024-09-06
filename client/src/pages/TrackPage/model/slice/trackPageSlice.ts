import { PayloadAction } from '@reduxjs/toolkit'
import { ITrack } from '@/src/entities/Track'
import { buildSlice } from '@/src/shared/lib/store'
import { HYDRATE } from 'next-redux-wrapper'
import { HydrateAction } from '@/src/app/providers/StoreProvider'
import { TrackPageSchema } from '../types/trackPageSchema'
import { fetchTracksList } from '../services/fetchTracksList/fetchTracksList'

const initialState: TrackPageSchema = {
    tracks: [],
    error: '',
    isLoading: false,
}
export const trackPageSlice = buildSlice({
    name: 'track',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action: HydrateAction) => {
                return { ...state, ...action.payload.trackPage }
            })
            .addCase(fetchTracksList.pending, (state) => {
                state.isLoading = true
                state.error = ''
            })
            .addCase(
                fetchTracksList.fulfilled,
                (state, action: PayloadAction<ITrack[]>) => {
                    state.isLoading = false
                    state.tracks = action.payload
                },
            )
            .addCase(fetchTracksList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: trackPageActions } = trackPageSlice
export const { reducer: trackPageReducer } = trackPageSlice
export const { useActions: usetrackPageActions } = trackPageSlice
