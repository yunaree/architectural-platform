"use client"

import ReactSnowfall from "react-snowfall"
import { useSnow } from "@/context/snow-context"

export function SnowOverlay() {
    const { isSnowing } = useSnow()

    if (!isSnowing) return null

    return (
        <div className="fixed inset-0 z-50 pointer-events-none" aria-hidden="true">
            <ReactSnowfall
                style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                }}
                snowflakeCount={150} // Оптимальна кількість, щоб не лагало
                radius={[0.5, 3.0]} // Різний розмір сніжинок
                speed={[0.5, 2.5]} // Швидкість падіння
                wind={[-0.5, 2.0]} // Ефект вітру
                color="#ffffff" // Можна змінити на легкий блакитний, якщо фон білий
            />
        </div>
    )
}