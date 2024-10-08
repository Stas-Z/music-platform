import { AppState } from '@/src/app/providers/StoreProvider'
import { useSelector } from 'react-redux'

export const useAppSelector = useSelector.withTypes<AppState>()
