import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/src/app/providers/StoreProvider'
import { IAlbum } from '../../types/album'

interface DeleteAlbumProps {
    id: string | string[] | undefined
}

export const deleteAlbum = createAsyncThunk<
    IAlbum,
    DeleteAlbumProps,
    ThunkConfig<string>
>('album/deleteAlbum', async ({ id }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const response = await extra.api.delete<IAlbum>(`albums/${id}`)

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
