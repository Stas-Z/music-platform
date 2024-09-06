import { StateSchema } from '@/src/app/providers/StoreProvider'
import { useTypedSelector } from '../hooks/useTypedSelector/useTypedSelector'

type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T
type Hook<T, Args extends any[]> = (...args: Args) => T
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>]

export function buildSelector<T, Args extends any[]>(
    selector: Selector<T, Args>,
): Result<T, Args> {
    const useSelectorHook: Hook<T, Args> = (...args: Args) => {
        return useTypedSelector((state: StateSchema) =>
            selector(state, ...args),
        )
    }

    return [useSelectorHook, selector]
}
