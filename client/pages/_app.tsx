import { StoreProvider, wrapper } from '@/src/app/providers/StoreProvider'
import { Player } from '@/src/features/Player'
import MainLayout from '@/src/shared/layouts/MainLayout/MainLayout'
import { Navbar } from '@/src/widgets/Navbar/ui/Navbar'
import { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest)

    return (
        <StoreProvider store={store}>
            <Head>
                <link rel="icon" type="image/x-icon" href="/icon.ico" />
            </Head>
            <MainLayout navbar={<Navbar />} player={<Player />}>
                <Component {...props.pageProps} />
            </MainLayout>
        </StoreProvider>
    )
}
export default MyApp
