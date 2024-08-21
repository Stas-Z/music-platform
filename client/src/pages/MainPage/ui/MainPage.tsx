import { memo } from 'react'
import cls from './MainPage.module.scss'
const MainPage = () => {
    return (
        <>
            <div className={cls.center}>
                <h1>Добро ожаловать!</h1>
                <h3>Здесь собраны лучшие треки.</h3>
            </div>
        </>
    )
}
export default memo(MainPage)
