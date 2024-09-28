import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/src/app/providers/StoreProvider'
import { IArtist } from '../../../../Artist/model/types/artist'

interface FetchTracksByArtistProps {
    id: string | string[] | undefined
}

export const fetchTracksByArtist = createAsyncThunk<
    IArtist,
    FetchTracksByArtistProps,
    ThunkConfig<string>
>('artist/fetchTracksByArtist', async ({ id }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const response = await extra.api.get<IArtist>(`tracks/artist/${id}`)

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
