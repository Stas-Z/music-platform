import { Box, Grid } from '@mui/material'
import { memo } from 'react'
import { AlbumListItem } from '../AlbumListItem/AlbumListItem'
import { IAlbum } from '../../model/types/album'
import { IArtist } from '@/src/entities/Artist'

interface ArtistsListProps {
    albums: IAlbum[]
    artist: IArtist
}
export const AlbumList = memo(({ albums, artist }: ArtistsListProps) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {albums.map((album) => {
                    return (
                        <AlbumListItem
                            key={album._id}
                            album={album}
                            artist={artist}
                        />
                    )
                })}
            </Box>
        </Grid>
    )
})
AlbumList.displayName = 'AlbumList'
