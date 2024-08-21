import cls from './ProgressBar.module.scss'

interface TrackProgressProps {
    left: number
    right: number
    onChanged: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProgressBar = ({ left, onChanged, right }: TrackProgressProps) => {
    return (
        <div className={cls.progressBar}>
            <input
                type="range"
                min={left}
                max={right}
                value={left}
                onChange={onChanged}
            />
            <div>
                {left} / {right}
            </div>
        </div>
    )
}

export default ProgressBar
