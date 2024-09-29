import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/src/app/providers/StoreProvider'
import { IAlbum } from '@/src/entities/Album/model/types/album'

interface AddArtistProps {
    name: string
    picture: File
    artist: string
}

export const addAlbum = createAsyncThunk<
    IAlbum,
    AddArtistProps,
    ThunkConfig<string>
>('addNewAlbum/addAlbum', async ({ name, picture, artist }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('picture', picture)
        formData.append('artist', artist)

        const response = await extra.api.post<IAlbum>('albums', formData)

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
