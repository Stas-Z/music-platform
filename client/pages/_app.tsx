import { StoreProvider, wrapper } from '@/src/app/providers/StoreProvider'
import { Player } from '@/src/features/Player'
import MainLayout from '@/src/shared/layouts/MainLayout/MainLayout'
import { Navbar } from '@/src/widgets/Navbar/ui/Navbar'
import { AppProps } from 'next/app'

function MyApp({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest)

    return (
        <StoreProvider store={store}>
            <MainLayout navbar={<Navbar />} player={<Player />}>
                <Component {...props.pageProps} />
            </MainLayout>
        </StoreProvider>
    )
}
export default MyApp
