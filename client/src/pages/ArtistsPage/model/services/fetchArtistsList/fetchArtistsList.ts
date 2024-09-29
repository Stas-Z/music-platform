import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/src/app/providers/StoreProvider'
import { IArtist } from '@/src/entities/Artist'

export const fetchArtistsList = createAsyncThunk<
    IArtist[],
    void,
    ThunkConfig<string>
>('artistPage/fetchArtistsList', async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const response = await extra.api.get<IArtist[]>('artists')

        if (!response.data) {
            throw new Error()
        }

        return response.data
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        console.log(e.response.data.message)

        return rejectWithValue(e.message)
    }
})
