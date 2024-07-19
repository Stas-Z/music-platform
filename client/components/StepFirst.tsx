import { Grid, TextField } from '@mui/material'
import React from 'react'
import cls from '../styles/Steps.module.scss'

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

export default StepFirst
