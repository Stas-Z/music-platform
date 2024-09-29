import { Box, Grid } from '@mui/material'
import { memo } from 'react'
import { IArtist } from '../../model/types/artist'
import { ArtistsListItem } from '../ArtistsListItem/ArtistsListItem'

interface ArtistsListProps {
    artists: IArtist[]
}
export const ArtistsList = memo(({ artists }: ArtistsListProps) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {artists.map((artist) => {
                    return <ArtistsListItem key={artist._id} artist={artist} />
                })}
            </Box>
        </Grid>
    )
})
ArtistsList.displayName = 'ArtistsList'
