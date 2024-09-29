import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/src/app/providers/StoreProvider'
import { ITrack } from '@/src/entities/Track'

interface DeleteArtistProps {
    id: string | string[] | undefined
}

export const deleteTrack = createAsyncThunk<
    ITrack,
    DeleteArtistProps,
    ThunkConfig<string>
>('track/deleteTrack', async ({ id }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const response = await extra.api.delete<ITrack>(`tracks/${id}`)

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
