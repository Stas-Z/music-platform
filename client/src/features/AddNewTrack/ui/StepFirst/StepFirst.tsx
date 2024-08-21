import { Grid, TextField } from '@mui/material'
import cls from './StepFirst.module.scss'
import { memo } from 'react'

const StepFirst = () => {
    return (
        <Grid container direction={'column'} className={cls.firstStep}>
            <TextField label="Название трека" className={cls.input} />
            <TextField label="Имя исполнителя" className={cls.input} />
            <TextField
                label="Текст песни"
                multiline
                rows={3}
                className={cls.input}
            />
        </Grid>
    )
}

export default memo(StepFirst)
