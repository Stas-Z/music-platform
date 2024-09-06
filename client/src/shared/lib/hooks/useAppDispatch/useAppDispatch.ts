import { AppDispatch } from '@/src/app/providers/StoreProvider'
import { useDispatch } from 'react-redux'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
