import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/src/app/providers/StoreProvider'
import { IArtist } from '@/src/entities/Artist/model/types/artist'

interface DeleteArtistProps {
    id: string | string[] | undefined
}

export const deleteArtist = createAsyncThunk<
    IArtist,
    DeleteArtistProps,
    ThunkConfig<string>
>('addNewArtist/deleteArtist', async ({ id }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const response = await extra.api.delete<IArtist>(`artists/${id}`)

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
