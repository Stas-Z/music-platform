import { wrapper } from '@/src/app/providers/StoreProvider'
import { fetchArtistById } from '@/src/entities/Artist'
import { ArtistDeatailsPage } from '@/src/pages/ArtistDeatailsPage'
import { GetServerSideProps } from 'next'

export default ArtistDeatailsPage

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ params }) => {
        const dispatch = store.dispatch
        const response = await dispatch(fetchArtistById({ id: params?.id }))

        return {
            props: {
                serverArtist: response.payload,
            },
        }
    })
