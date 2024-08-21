import { Button, Grid } from '@mui/material'
import { memo, useCallback, useState } from 'react'
import StepWraper from '../StepWraper/StepWraper'
import StepFirst from '../StepFirst/StepFirst'
import StepNext from '../StepNext/StepNext'

export const AddNewTrack = memo(() => {
    const [activeStep, setActiveStep] = useState(0)

    const [picture, setPicture] = useState<File | null>(null)
    const [audio, setAudio] = useState<File | null>(null)

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
})

AddNewTrack.displayName = 'AddNewTrack'
