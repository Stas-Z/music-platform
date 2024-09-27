import { wrapper } from '@/src/app/providers/StoreProvider'
import { fetchArtistsList } from '@/src/entities/Artist'
import { CreateNewArtistPage } from '@/src/pages/CreateNewArtistPage'
import { GetServerSideProps } from 'next'

export default CreateNewArtistPage
export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async (ctx) => {
        const dispatch = store.dispatch

        await dispatch(await fetchArtistsList())
        return { props: {} }
    })
