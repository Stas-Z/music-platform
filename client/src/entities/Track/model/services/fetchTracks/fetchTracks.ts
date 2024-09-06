import { createAsyncThunk } from '@reduxjs/toolkit'
import { ITrack } from '../../types/track'
import { ThunkConfig } from '@/src/app/providers/StoreProvider'

export const fetchTracks = createAsyncThunk<
    ITrack[],
    void,
    ThunkConfig<string>
>('track/fetchTracks', async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const response = await extra.api.get<ITrack[]>('tracks', {})

        if (!response.data) {
            throw new Error()
        }

        return response.data
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
