import { Box, Grid } from '@mui/material'
import { memo } from 'react'
import { IArtist } from '../../model/types/artist'
import { ArtistsListItem } from '../ArtistsListItem/ArtistsListItem'

interface ArtistsListProps {
    artists: IArtist[]
    onClick: (id: string) => void
}
export const ArtistsList = memo(({ artists, onClick }: ArtistsListProps) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {artists.map((artist) => {
                    return (
                        <ArtistsListItem
                            key={artist._id}
                            artist={artist}
                            onClick={onClick}
                        />
                    )
                })}
            </Box>
        </Grid>
    )
})
ArtistsList.displayName = 'ArtistsList'
