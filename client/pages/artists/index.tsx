import { wrapper } from '@/src/app/providers/StoreProvider'
import { fetchArtistsList } from '@/src/entities/Artist'
import { ArtistsPage } from '@/src/pages/ArtistsPage'
import { GetServerSideProps } from 'next'

const Index = () => <ArtistsPage />
export default Index

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async (ctx) => {
        const dispatch = store.dispatch

        await dispatch(await fetchArtistsList())
        return { props: {} }
    })
