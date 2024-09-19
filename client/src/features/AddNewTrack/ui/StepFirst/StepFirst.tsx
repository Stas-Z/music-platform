import { Grid, TextField } from '@mui/material'
import cls from './StepFirst.module.scss'
import { memo } from 'react'
import { useInputType } from '@/src/shared/lib/hooks/useInput/useInput'

interface StepFirstProps {
    trackName: useInputType
    artist: useInputType
    text: useInputType
}

const StepFirst = ({ trackName, artist, text }: StepFirstProps) => {
    return (
        <Grid container direction={'column'} className={cls.firstStep}>
            <TextField
                {...trackName}
                label="Название трека"
                className={cls.input}
            />
            <TextField
                {...artist}
                label="Имя исполнителя"
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
