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
                snowflakeCount={150}
                radius={[0.5, 3.0]}
                speed={[0.5, 2.5]}
                wind={[-0.5, 2.0]}
                color="#ffffff"
            />
        </div>
    )
}