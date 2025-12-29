"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type SnowContextType = {
    isSnowing: boolean
    toggleSnow: () => void
}

const SnowContext = createContext<SnowContextType | undefined>(undefined)

export function SnowProvider({ children }: { children: React.ReactNode }) {
    const [isSnowing, setIsSnowing] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem("snow-effect")
        if (stored === null) {
            setIsSnowing(true)
        } else {
            setIsSnowing(stored === "true")
        }
    }, [])

    const toggleSnow = () => {
        setIsSnowing((prev) => {
            const newValue = !prev
            localStorage.setItem("snow-effect", String(newValue))
            return newValue
        })
    }

    return (
        <SnowContext.Provider value={{ isSnowing, toggleSnow }}>
            {children}
        </SnowContext.Provider>
    )
}

export function useSnow() {
    const context = useContext(SnowContext)
    if (context === undefined) {
        throw new Error("useSnow must be used within a SnowProvider")
    }
    return context
}