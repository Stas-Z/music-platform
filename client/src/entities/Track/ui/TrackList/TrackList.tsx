import { Box, Grid } from '@mui/material'
import { ITrack } from '../../model/types/track'
import { TrackListItem } from '../TrackListItem/TrackListItem'
import { memo } from 'react'

interface TrackListProps {
    tracks: ITrack[]
    onClick: (id: string) => void
}
export const TrackList = memo(({ tracks, onClick }: TrackListProps) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {tracks.map((track) => {
                    return (
                        <TrackListItem
                            key={track._id}
                            track={track}
                            onClick={onClick}
                        />
                    )
                })}
            </Box>
        </Grid>
    )
})
TrackList.displayName = 'TrackList'
