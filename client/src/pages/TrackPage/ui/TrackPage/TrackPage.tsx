import { Box, Button, Card, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { memo } from 'react'
import cls from './TrackPage.module.scss'
import { ITrack, TrackList } from '@/src/entities/Track'

interface TrackPageProps {
    serverTracks: ITrack[]
}

const TackPage = ({ serverTracks }: TrackPageProps) => {
    const router = useRouter()

    return (
        <Grid container justifyContent="center">
            <Card className={cls.card}>
                <Box p={3}>
                    <Grid container justifyContent="space-between">
                        <h1>Список треков</h1>
                        <Grid container alignItems={'center'} width={'auto'}>
                            <Button
                                variant="outlined"
                                onClick={() => router.push('/tracks/create')}
                                size="medium"
                            >
                                Загрузить
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <TrackList tracks={serverTracks} />
            </Card>
        </Grid>
    )
}

export default memo(TackPage)
