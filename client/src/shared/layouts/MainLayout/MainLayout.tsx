import { Container } from '@mui/material'
import React, { ReactNode } from 'react'
import cls from './MainLayout.module.scss'

interface MainLayoutProps {
    children: ReactNode
    navbar: ReactNode
    player?: ReactNode
}

const MainLayout = ({ children, navbar, player }: MainLayoutProps) => {
    return (
        <>
            {navbar}
            <Container className={cls.container}>{children}</Container>
            {player}
        </>
    )
}

export default MainLayout
