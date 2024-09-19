import { Box, Button, Card, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { memo } from 'react'
import cls from './TrackPage.module.scss'
import { TrackList } from '@/src/entities/Track'
import { getTrackList } from '../model/selectors/getTrack'
import { useAppSelector } from '@/src/shared/lib/hooks/useAppSelector/useAppSelector'

const TackPage = () => {
    const router = useRouter()

    const tracks = useAppSelector(getTrackList)

    return (
        <Grid container justifyContent="center">
            <Card className={cls.card}>
                <Box p={3}>
                    <Grid container justifyContent="space-between">
                        <h1>Список треков</h1>
                        <Button onClick={() => router.push('/tracks/create')}>
                            Загрузить
                        </Button>
                    </Grid>
                </Box>
                <TrackList tracks={tracks} />
            </Card>
        </Grid>
    )
}

export default memo(TackPage)
