import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/src/app/providers/StoreProvider'
import { IArtist } from '@/src/entities/Artist/model/types/artist'

interface addArtistProps {
    name: string
    picture: File
}

export const addArtist = createAsyncThunk<
    IArtist,
    addArtistProps,
    ThunkConfig<string>
>('addNewArtist/addArtist', async ({ name, picture }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('picture', picture)

        const response = await extra.api.post<IArtist>('artists', formData)

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
