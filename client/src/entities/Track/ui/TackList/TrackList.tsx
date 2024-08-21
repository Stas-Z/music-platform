import { Box, Grid } from '@mui/material'
import { ITrack } from '../../model/types/track'
import { TrackListItem } from '../TackListItem/TackListItem'

interface TrackListProps {
    tracks: ITrack[]
}
export const TrackList = ({ tracks }: TrackListProps) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {tracks.map((track) => {
                    return <TrackListItem key={track._id} track={track} />
                })}
            </Box>
        </Grid>
    )
}
