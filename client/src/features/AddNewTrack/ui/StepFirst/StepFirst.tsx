import { Grid, TextField } from '@mui/material'
import cls from './StepFirst.module.scss'
import { memo } from 'react'
import { useInputType } from '@/src/shared/lib/hooks/useInput/useInput'
import { IArtist } from '@/src/entities/Artist/model/types/artist'
import { IAlbum } from '@/src/entities/Album'

interface StepFirstProps {
    trackName: useInputType
    text: useInputType
    currentArtist: IArtist | null
    currentALbum: IAlbum | null
}

const StepFirst = ({
    trackName,
    text,
    currentArtist,
    currentALbum,
}: StepFirstProps) => {
    return (
        <Grid container direction={'column'} className={cls.firstStep}>
            <TextField
                value={currentArtist?.name}
                label="Исполнитель"
                className={cls.input}
                disabled
            />
            <TextField
                value={currentALbum?.name}
                label="Альбом"
                className={cls.input}
                disabled
            />
            <TextField
                {...trackName}
                label="Название трека"
                className={cls.input}
            />

            <TextField
                {...text}
                label="Текст песни"
                multiline
                rows={3}
                className={cls.input}
            />
        </Grid>
    )
}

export default memo(StepFirst)
