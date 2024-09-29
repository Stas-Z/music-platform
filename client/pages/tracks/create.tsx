import { wrapper } from '@/src/app/providers/StoreProvider'
import { fetchArtistsList } from '@/src/pages/ArtistsPage'
import { CreateNewTrackPage } from '@/src/pages/TrackPage'
import { GetServerSideProps } from 'next'

export default CreateNewTrackPage
export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async (ctx) => {
        const dispatch = store.dispatch

        await dispatch(await fetchArtistsList())
        return { props: {} }
    })
