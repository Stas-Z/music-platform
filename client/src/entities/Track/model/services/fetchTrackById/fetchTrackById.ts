import { createAsyncThunk } from '@reduxjs/toolkit'
import { ITrack } from '../../types/track'
import { ThunkConfig } from '@/src/app/providers/StoreProvider'

interface fetchTrackByIdProps {
    id: string | string[] | undefined
}

export const fetchTrackById = createAsyncThunk<
    ITrack[],
    fetchTrackByIdProps,
    ThunkConfig<string>
>('track/fetchTrackById', async ({ id }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const response = await extra.api.get<ITrack[]>(`tracks/${id}`)

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
