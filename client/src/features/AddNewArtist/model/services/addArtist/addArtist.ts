import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/src/app/providers/StoreProvider'
import { IArtist } from '@/src/entities/Artist/model/types/artist'

interface AddArtistProps {
    name: string
    picture: File
    text: string
}

export const addArtist = createAsyncThunk<
    IArtist,
    AddArtistProps,
    ThunkConfig<string>
>('addNewArtist/addArtist', async ({ name, picture, text }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    console.log('text: ', text)

    try {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('picture', picture)
        formData.append('text', text)

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
