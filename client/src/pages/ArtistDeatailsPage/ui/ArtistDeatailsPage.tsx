import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { memo } from 'react'
import cls from './ArtistDeatailsPage.module.scss'
import { ArtistDetails } from '@/src/entities/Artist'
import { IArtist } from '@/src/entities/Artist/model/types/artist'
import { TrackList } from '@/src/entities/Track'

interface ArtistDeatailsPagePageProps {
    serverArtist: IArtist
}

const ArtistDeatailsPage = ({ serverArtist }: ArtistDeatailsPagePageProps) => {
    const router = useRouter()

    return (
        <>
            <Button
                variant="outlined"
                className={cls.button}
                onClick={() => router.push('/artists')}
            >
                К списку
            </Button>
            <ArtistDetails artist={serverArtist} />
            <h1>Треки</h1>
            <TrackList tracks={serverArtist.tracks || []} />
        </>
    )
}

export default memo(ArtistDeatailsPage)
