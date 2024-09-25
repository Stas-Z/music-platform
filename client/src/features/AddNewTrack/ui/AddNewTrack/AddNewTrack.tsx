import { Button, Grid } from '@mui/material'
import { memo, useCallback, useState } from 'react'
import StepWraper from '../StepWraper/StepWraper'
import StepFirst from '../StepFirst/StepFirst'
import StepNext from '../StepNext/StepNext'
import { useInput } from '@/src/shared/lib/hooks/useInput/useInput'
import { addTrack } from '../../model/services/addTrack/addTrack'
import { useAppDispatch } from '@/src/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getArtistList } from '@/src/entities/Artist/model/services/selectors/getArtistsSelectors'

export const AddNewTrack = memo(() => {
    const [activeStep, setActiveStep] = useState(0)

    const dispatch = useAppDispatch()
    const router = useRouter()

    const [artist, setArtist] = useState('')
    const [picture, setPicture] = useState<File | null>(null)
    const [audio, setAudio] = useState<File | null>(null)

    const artists = useSelector(getArtistList)

    const trackName = useInput('')
    const text = useInput('')

    const back = useCallback(() => {
        setActiveStep((prev) => prev - 1)
    }, [])

    const next = useCallback(async () => {
        if (activeStep !== 2) {
            setActiveStep((prev) => prev + 1)
        } else {
            const result = await dispatch(
                addTrack({
                    name: trackName.value,
                    audio: audio as File,
                    picture: picture as File,
                    text: text.value,
                    artistId: artist,
                }),
            )

            if (result.meta.requestStatus === 'fulfilled') {
                router.push('/tracks')
            }
        }
    }, [activeStep, picture, audio])

    return (
        <>
            <StepWraper activeStep={activeStep}>
                {activeStep === 0 && (
                    <StepFirst
                        trackName={trackName}
                        artists={artists}
                        text={text}
                        onChange={setArtist}
                        artist={artist}
                    />
                )}
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
