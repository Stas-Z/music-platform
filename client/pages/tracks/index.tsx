import { wrapper } from '@/src/app/providers/StoreProvider'
import { fetchTracksList, TrackPage } from '@/src/pages/TrackPage'
import { GetServerSideProps } from 'next'

export default TrackPage

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async (ctx) => {
        const dispatch = store.dispatch

        const response = await dispatch(await fetchTracksList())
        return {
            props: {
                serverTracks: response.payload,
            },
        }
    })
