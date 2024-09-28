import { createSlice } from '@reduxjs/toolkit'
import { AddTrackSchema } from '../types/addTrackSchema'
import { addTrack } from '../services/addTrack/addTrack'

const initialState: AddTrackSchema = {
    isLoading: false,
    onSucces: false,
    error: '',
}

export const addTrackSlice = createSlice({
    name: 'addTrack',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTrack.pending, (state) => {
                state.isLoading = true
                state.onSucces = false
                state.error = undefined
            })
            .addCase(addTrack.fulfilled, (state) => {
                state.isLoading = false
                state.onSucces = true
            })
            .addCase(addTrack.rejected, (state, action) => {
                state.isLoading = false
                state.onSucces = false
                state.error = action.payload
            })
    },
})

export const { actions: addTrackActions } = addTrackSlice
export const { reducer: addTrackReducer } = addTrackSlice
