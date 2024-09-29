import { wrapper } from '@/src/app/providers/StoreProvider'
import {
    fetchTrackById,
    TrackDeatailsPage,
} from '@/src/pages/TrackDeatailsPage'
import { GetServerSideProps } from 'next'

export default TrackDeatailsPage

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ params }) => {
        const dispatch = store.dispatch
        const response = await dispatch(fetchTrackById({ id: params?.id }))

        return {
            props: {
                serverTrack: response.payload,
            },
        }
    })
