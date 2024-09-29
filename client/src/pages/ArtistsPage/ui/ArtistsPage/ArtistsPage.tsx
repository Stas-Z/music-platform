import { Box, Button, Card, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { memo } from 'react'
import cls from './ArtistsPage.module.scss'
import { ArtistsList, IArtist } from '@/src/entities/Artist'

interface ArtistsPageProps {
    serverArtists: IArtist[]
}

const ArtistsPage = ({ serverArtists }: ArtistsPageProps) => {
    const router = useRouter()

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
                <ArtistsList artists={serverArtists} />
            </Card>
        </Grid>
    )
}

export default memo(ArtistsPage)
