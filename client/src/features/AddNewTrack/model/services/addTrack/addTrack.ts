import { createAsyncThunk } from '@reduxjs/toolkit'

import { ITrack } from '@/src/entities/Track'
import { ThunkConfig } from '@/src/app/providers/StoreProvider'

interface addTrackProps {
    name: string
    artist: string
    text: string
    picture: File
    audio: File
}

export const addTrack = createAsyncThunk<
    ITrack,
    addTrackProps,
    ThunkConfig<string>
>(
    'addNewTrack/addTrack',
    async ({ name, artist, text, picture, audio }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('artist', artist)
            formData.append('text', text)
            formData.append('picture', picture)
            formData.append('audio', audio)
            formData.append('artistId', '66769f704292af4ccf67de40')
            formData.append('albumsId', '66769f8e4292af4ccf67de44')

            const response = await extra.api.post<ITrack>('tracks', formData)

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
    },
)
