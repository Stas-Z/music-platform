import Navbar from '@/components/Navbar'
import { Container } from '@mui/material'
import React, { ReactNode } from 'react'
import cls from '@/styles/MainLayout.module.scss'
import Player from '@/components/Player'

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <Navbar />
            <Container className={cls.container}>{children}</Container>
            <Player />
        </>
    )
}

export default MainLayout
