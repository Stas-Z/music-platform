import { Box, Button, Card, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { memo, useCallback } from 'react'
import cls from './ArtistsPage.module.scss'
import { useAppSelector } from '@/src/shared/lib/hooks/useAppSelector/useAppSelector'
import { getArtistList } from '@/src/entities/Artist'
import { useAppDispatch } from '@/src/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deleteArtist } from '@/src/features/AddNewArtist'
import { ArtistsList } from '@/src/entities/Artist'

const ArtistsPage = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const artists = useAppSelector(getArtistList)

    const deleteArtistHandle = useCallback(
        (id: string) => {
            dispatch(deleteArtist({ id }))
        },
        [dispatch],
    )

    return (
        <Grid container justifyContent="center">
            <Card className={cls.card}>
                <Box p={3}>
                    <Grid container justifyContent="space-between">
                        <h1>Список Артистов</h1>
                        <Button onClick={() => router.push('/artists/create')}>
                            Добавить Артиста
                        </Button>
                    </Grid>
                </Box>
                <ArtistsList artists={artists} onClick={deleteArtistHandle} />
            </Card>
        </Grid>
    )
}

export default memo(ArtistsPage)
