import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITrack } from '@/src/entities/Track'
import { TrackDetailsPageSchema } from '../types/trackDetailsPageSchema'
import { fetchTrackById } from '../services/fetchTrackById/fetchTrackById'
import { HYDRATE } from 'next-redux-wrapper'
import { HydrateAction } from '@/src/app/providers/StoreProvider'

const initialState: TrackDetailsPageSchema = {
    track: null,
    error: '',
    isLoading: false,
    onSucces: false,
}
export const trackDetailsPageSlice = createSlice({
    name: 'trackDetailsPage',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(HYDRATE, (state, action: HydrateAction) => {
                return { ...state, ...action.payload.trackDetailsPage }
            })
            .addCase(fetchTrackById.pending, (state) => {
                state.isLoading = true
                state.error = ''
            })
            .addCase(
                fetchTrackById.fulfilled,
                (state, action: PayloadAction<ITrack>) => {
                    state.isLoading = false
                    state.track = action.payload
                },
            )
            .addCase(fetchTrackById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: trackDetailsPageActions } = trackDetailsPageSlice
export const { reducer: trackDetailsPageReducer } = trackDetailsPageSlice
