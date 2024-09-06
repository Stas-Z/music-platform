import { memo } from 'react'
import cls from './ProgressBar.module.scss'
import { formatTime } from '../../lib/helpers/formatTime/formatTime'

interface TrackProgressProps {
    left: number
    right: number
    onChanged?: (e: React.ChangeEvent<HTMLInputElement>) => void
    timer?: boolean
}

export const ProgressBar = memo(
    ({ left, onChanged, right, timer = false }: TrackProgressProps) => {
        let content
        if (timer) {
            content = `${formatTime(left)} / ${formatTime(right)}`
        } else {
            content = `${left} / ${right}`
        }
        return (
            <div className={cls.progressBar}>
                <input
                    type="range"
                    min={0}
                    max={right}
                    value={left}
                    onChange={onChanged}
                />
                <div>{content}</div>
            </div>
        )
    },
)
ProgressBar.displayName = 'ProgressBar'
