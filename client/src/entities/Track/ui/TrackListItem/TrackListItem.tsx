import { ITrack } from '../../model/types/track'
import { Card, Grid, IconButton } from '@mui/material'
import cls from './TrackListItem.module.scss'
import { Delete, Pause, PlayArrow } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { memo, MouseEvent, useCallback } from 'react'
import { useTrackActions } from '../../model/slice/trackSlice'
import Image from 'next/image'
import { useTrackValue } from '../../model/selectors/getTrack'
import { getApiURL } from '@/src/shared/lib/helpers/getApiURL/getApiURL'
import { useAppDispatch } from '@/src/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deleteTrack } from '../../model/services/deleteTrack/deleteTrack'

interface TrackListItemProps {
    track: ITrack
    active?: boolean
}

export const TrackListItem = memo(
    ({ track, active = false }: TrackListItemProps) => {
        const router = useRouter()
        const dispatch = useAppDispatch()
        const { pause, activeTrack } = useTrackValue()
        const { setPause, setPlay, setActive } = useTrackActions()

        const playHandle = useCallback(
            (e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()

                if (activeTrack?._id === track._id) {
                    if (pause) {
                        setPlay()
                    } else {
                        setPause()
                    }
                } else {
                    setActive(track) // Если трек не активен - делаем его активным и запускаем воспроизведение
                }
            },
            [activeTrack?._id, pause, setActive, setPause, setPlay, track],
        )

        const deleteTrackHandle = useCallback(
            (e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                dispatch(deleteTrack({ id: track._id }))
                router.push('/tracks/')
            },
            [dispatch, router, track._id],
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
                    src={getApiURL(track.picture)}
                    alt={track.name}
                />
                <Grid container direction={'column'} className={cls.rightBlock}>
                    <div>{track.name}</div>
                    <div className={cls.artist}>{track.artist?.name}</div>
                </Grid>
                {active && <div>02:22 / 03:22</div>}
                <IconButton className={cls.delete} onClick={deleteTrackHandle}>
                    <Delete />
                </IconButton>
            </Card>
        )
    },
)
TrackListItem.displayName = 'TrackListItem'
