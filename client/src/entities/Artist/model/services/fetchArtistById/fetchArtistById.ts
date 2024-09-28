import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/src/app/providers/StoreProvider'
import { IArtist } from '../../types/artist'

interface FetchArtistByIdProps {
    id: string | string[] | undefined
}

export const fetchArtistById = createAsyncThunk<
    IArtist,
    FetchArtistByIdProps,
    ThunkConfig<string>
>('artist/fetchArtistById', async ({ id }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const response = await extra.api.get<IArtist>(`artists/${id}`)

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
