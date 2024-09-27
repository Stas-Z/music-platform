import { wrapper } from '@/src/app/providers/StoreProvider'
import { fetchArtistsList } from '@/src/entities/Artist'
import { CreateNewTrackPage } from '@/src/pages/CreateNewTrackPage'
import { GetServerSideProps } from 'next'

export default CreateNewTrackPage
export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async (ctx) => {
        const dispatch = store.dispatch

        await dispatch(await fetchArtistsList())
        return { props: {} }
    })
