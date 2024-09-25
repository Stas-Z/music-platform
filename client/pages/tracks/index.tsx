import { wrapper } from '@/src/app/providers/StoreProvider'
import { fetchArtistsList } from '@/src/entities/Artist'
import { fetchTracksList, TrackPage } from '@/src/pages/TrackPage'
import { GetServerSideProps } from 'next'

const Index = () => <TrackPage />
export default Index

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async (ctx) => {
        const dispatch = store.dispatch

        await dispatch(await fetchTracksList())
        await dispatch(await fetchArtistsList())
        return { props: {} }
    })
