import { ITrack } from '../../model/types/track'
import { Card, Grid, IconButton } from '@mui/material'
import cls from './TrackListItem.module.scss'
import { Delete, Pause, PlayArrow } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { memo, MouseEvent, useCallback } from 'react'
import { useTrackActions } from '../../model/slice/trackSlice'
import Image from 'next/image'
import { useTrackValue } from '../../model/selectors/getTrack'

interface TrackListItemProps {
    track: ITrack
    active?: boolean
}

export const TrackListItem = memo(
    ({ track, active = false }: TrackListItemProps) => {
        const router = useRouter()
        const { pause, activeTrack } = useTrackValue()
        const { setPause, setPlay, setActive } = useTrackActions()

        const playHandle = useCallback(
            (e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()

                if (activeTrack?._id === track._id) {
                    console.log('TrackListItem: pause: ', pause)
                    if (pause) {
                        setPlay()
                    } else {
                        console.log('pause set')

                        setPause()
                    }
                } else {
                    setActive(track) // Если трек не активен - делаем его активным и запускаем воспроизведение
                }
            },
            [activeTrack?._id, pause, setActive, setPause, setPlay, track],
        )

        return (
            <Card
                className={cls.track}
                onClick={() => router.push('/tracks/' + track._id)}
            >
                <IconButton onClick={playHandle}>
                    {active ? <Pause /> : <PlayArrow />}
                </IconButton>
                <Image
                    width={70}
                    height={70}
                    src={'http://localhost:5000/' + track.picture}
                    alt={track.name}
                />
                <Grid container direction={'column'} className={cls.rightBlock}>
                    <div>{track.name}</div>
                    <div className={cls.artist}>{track.artist}</div>
                </Grid>
                {active && <div>02:22 / 03:22</div>}
                <IconButton
                    className={cls.delete}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Delete />
                </IconButton>
            </Card>
        )
    },
)
TrackListItem.displayName = 'TrackListItem'
