import Player from '@/src/features/Player/ui/Player'
import MainLayout from '@/src/shared/layouts/MainLayout/MainLayout'
import { Navbar } from '@/src/widgets/Navbar/ui/Navbar'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MainLayout navbar={<Navbar />} player={<Player />}>
            <Component {...pageProps} />
        </MainLayout>
    )
}
