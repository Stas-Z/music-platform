import { EnhancedStore } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

interface Props {
    readonly children: ReactNode
    store: EnhancedStore
}

export const StoreProvider = ({ children, store }: Props) => {
    return <Provider store={store}>{children}</Provider>
}
