import { wrapper } from '@/src/app/providers/StoreProvider'
import { ArtistsPage, fetchArtistsList } from '@/src/pages/ArtistsPage'
import { GetServerSideProps } from 'next'

export default ArtistsPage

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async (ctx) => {
        const dispatch = store.dispatch

        const response = await dispatch(await fetchArtistsList())
        return {
            props: {
                serverArtists: response.payload,
            },
        }
    })
