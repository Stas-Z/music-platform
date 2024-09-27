import { Box, Button, Card, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { memo, useCallback } from 'react'
import cls from './TrackPage.module.scss'
import { TrackList } from '@/src/entities/Track'
import { getTrackList } from '../model/selectors/getTrackListSelectors'
import { useAppSelector } from '@/src/shared/lib/hooks/useAppSelector/useAppSelector'
import { deleteTrack } from '@/src/features/AddNewTrack'
import { useAppDispatch } from '@/src/shared/lib/hooks/useAppDispatch/useAppDispatch'

const TackPage = () => {
    const router = useRouter()

    const tracks = useAppSelector(getTrackList)
    const dispatch = useAppDispatch()

    const deleteArtistHandle = useCallback(
        (id: string) => {
            dispatch(deleteTrack({ id }))
        },
        [dispatch],
    )

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
                <TrackList tracks={tracks} onClick={deleteArtistHandle} />
            </Card>
        </Grid>
    )
}

export default memo(TackPage)
