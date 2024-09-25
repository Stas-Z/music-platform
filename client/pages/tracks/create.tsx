import { wrapper } from '@/src/app/providers/StoreProvider'
import { fetchArtistsList } from '@/src/entities/Artist'
import { CreatePage } from '@/src/pages/CreatePage'
import { GetServerSideProps } from 'next'

export default CreatePage
export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async (ctx) => {
        const dispatch = store.dispatch

        await dispatch(await fetchArtistsList())
        return { props: {} }
    })
