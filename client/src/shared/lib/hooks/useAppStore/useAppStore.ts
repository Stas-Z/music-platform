import { AppStore } from '@/src/app/providers/StoreProvider'
import { useStore } from 'react-redux'

export const useAppStore = useStore.withTypes<AppStore>()
