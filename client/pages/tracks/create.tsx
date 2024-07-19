import StepFirst from '@/components/StepFirst'
import StepNext from '@/components/StepNext'
import StepWraper from '@/components/StepWraper'
import { Button, Grid } from '@mui/material'
import React, { useCallback, useState } from 'react'

const Create = () => {
    const [activeStep, setActiveStep] = useState(0)

    const [picture, setPicture] = useState<File | null>(null)
    const [audoi, setAudio] = useState<File | null>(null)

    const back = useCallback(() => {
        setActiveStep((prev) => prev - 1)
    }, [])

    const next = useCallback(() => {
        if (activeStep !== 2) {
            setActiveStep((prev) => prev + 1)
        }
    }, [activeStep])

    return (
        <>
            <StepWraper activeStep={activeStep}>
                {activeStep === 0 && <StepFirst />}
                {activeStep === 1 && (
                    <StepNext
                        label="Загрузите изображение"
                        fileFormat="image/*"
                        setFile={setPicture}
                    />
                )}
                {activeStep === 2 && (
                    <StepNext
                        label="Загрузите аудио"
                        fileFormat="audio/*"
                        setFile={setAudio}
                    />
                )}
            </StepWraper>
            <Grid justifyContent={'space-between'} display={'flex'}>
                <Button disabled={activeStep === 0} onClick={back}>
                    Назад
                </Button>
                <Button onClick={next}>Далее</Button>
            </Grid>
        </>
    )
}

export default Create
