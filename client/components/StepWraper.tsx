import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material'
import React, { ReactNode } from 'react'
import cls from '@/styles/StepWraper.module.scss'

interface StepWraperProps {
    activeStep: number
    children: ReactNode
}
const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите трек']

const StepWraper = ({ activeStep, children }: StepWraperProps) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index} completed={activeStep > index}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid
                container
                justifyContent={'center'}
                className={cls.stepContainer}
            >
                <Card className={cls.cardWrapper}>{children}</Card>
            </Grid>
        </Container>
    )
}

export default StepWraper
