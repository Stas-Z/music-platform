import React from 'react'
import { ITrack } from '@/types/track'
import { Card, Grid, IconButton } from '@mui/material'
import cls from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from '@mui/icons-material'
import { useRouter } from 'next/router'

interface TrackItemProps {
    track: ITrack
    active?: boolean
}

export const TrackItem = ({ track, active = false }: TrackItemProps) => {
    const router = useRouter()
    return (
        <Card
            className={cls.track}
            onClick={() => router.push('/tracks/' + track._id)}
        >
            <IconButton onClick={(e) => e.stopPropagation()}>
                {active ? <Pause /> : <PlayArrow />}
            </IconButton>
            <img width={70} height={70} src={track.picture} />
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
}
