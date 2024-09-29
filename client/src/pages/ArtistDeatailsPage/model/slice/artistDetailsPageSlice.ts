import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArtistDetailsPageSchema } from '../types/trackDetailsPageSchema'
import { HYDRATE } from 'next-redux-wrapper'
import { HydrateAction } from '@/src/app/providers/StoreProvider'
import { IArtist } from '@/src/entities/Artist'
import { fetchArtistById } from '../services/fetchArtistById/fetchArtistById'

const initialState: ArtistDetailsPageSchema = {
    artist: null,
    error: '',
    isLoading: false,
    onSucces: false,
}
export const artistDetailsPageSlice = createSlice({
    name: 'artistDetailsPage',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(HYDRATE, (state, action: HydrateAction) => {
                return { ...state, ...action.payload.artistDetailsPage }
            })
            .addCase(fetchArtistById.pending, (state) => {
                state.isLoading = true
                state.error = ''
            })
            .addCase(
                fetchArtistById.fulfilled,
                (state, action: PayloadAction<IArtist>) => {
                    state.isLoading = false
                    state.artist = action.payload
                },
            )
            .addCase(fetchArtistById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: artistDetailsPageActions } = artistDetailsPageSlice
export const { reducer: artistDetailsPageReducer } = artistDetailsPageSlice
