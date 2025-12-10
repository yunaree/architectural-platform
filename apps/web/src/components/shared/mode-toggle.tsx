"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {ThemeSwitcher} from "@/components/ui/shadcn-io/theme-switcher";

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <ThemeSwitcher defaultValue="dark" onChange={setTheme} />
    )
}