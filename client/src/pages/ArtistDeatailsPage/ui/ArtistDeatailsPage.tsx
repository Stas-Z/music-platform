import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { memo } from 'react'
import cls from './ArtistDeatailsPage.module.scss'
import { ArtistDetails } from '@/src/entities/Artist'
import { IArtist } from '@/src/entities/Artist/model/types/artist'
import { TrackList } from '@/src/entities/Track'
import { AlbumList } from '@/src/entities/Album/ui/AlbumList/AlbumList'

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
            <h2>Дискография</h2>
            <AlbumList
                albums={serverArtist.albums || []}
                artist={serverArtist}
            />
            <h2>Все треки</h2>
            <TrackList tracks={serverArtist.tracks || []} />
        </>
    )
}

export default memo(ArtistDeatailsPage)
