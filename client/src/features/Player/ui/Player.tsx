import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import cls from './Player.module.scss'
import { ProgressBar } from '@/src/shared/ui/ProgressBar'
import { ChangeEvent, memo, useCallback, useEffect } from 'react'
import { useTrackActions } from '@/src/entities/Track'
import { useAppSelector } from '@/src/shared/lib/hooks/useAppSelector/useAppSelector'
import {
    getActiveTrack,
    getCurrentTime,
    getDuration,
    getPause,
    getVolume,
} from '@/src/entities/Track/model/selectors/getTrack'
import { getApiURL } from '@/src/shared/lib/helpers/getApiURL/getApiURL'
import { getArtistById } from '@/src/entities/Artist'

let audio: HTMLAudioElement

export const Player = memo(() => {
    const activeTrack = useAppSelector(getActiveTrack)
    const currentTime = useAppSelector(getCurrentTime)
    const duration = useAppSelector(getDuration)
    const pause = useAppSelector(getPause)
    const volume = useAppSelector(getVolume)

    const artistName = useAppSelector(
        getArtistById(activeTrack?.artistId || ''),
    )

    const { setCurrentTime, setDuration, setPause, setPlay, setVolume } =
        useTrackActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            if (activeTrack) {
                setAudio()
                playHandle()
            }
        }
    }, [activeTrack])

    useEffect(() => {
        if (pause) {
            audio.pause()
        } else {
            audio.play()
        }
    }, [pause])

    const setAudio = useCallback(() => {
        if (activeTrack) {
            audio.src = getApiURL(activeTrack.audio)
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }, [activeTrack])

    const playHandle = useCallback(() => {
        if (!audio || !activeTrack) return

        if (pause) {
            setPlay()
            audio.play()
        } else {
            setPause()
            audio.pause()
        }
    }, [activeTrack, pause, setPause, setPlay])

    const volumeHandle = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            audio.volume = Number(e.target.value) / 100
            setVolume(Number(e.target.value))
        },
        [setVolume],
    )

    const currentTimeHandle = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            audio.currentTime = Number(e.target.value)
            setCurrentTime(Number(e.target.value))
        },
        [setCurrentTime],
    )
    if (!activeTrack) {
        return null
    }

    return (
        <div className={cls.player}>
            <IconButton onClick={playHandle}>
                {pause ? <PlayArrow /> : <Pause />}
            </IconButton>
            <Grid container direction={'column'} className={cls.rightBlock}>
                <div>{activeTrack?.name}</div>
                <div className={cls.artist}>{artistName?.name}</div>
            </Grid>
            <ProgressBar
                left={currentTime}
                right={duration}
                onChanged={currentTimeHandle}
                timer
            />
            <VolumeUp className={cls.volume} />
            <ProgressBar left={volume} right={100} onChanged={volumeHandle} />
        </div>
    )
})
Player.displayName = 'Player'
