"use client"

import { Snowflake } from "lucide-react"
import { useSnow } from "@/context/snow-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface SnowToggleProps {
    className?: string
    variant?: "minimal" | "full"
}

export function SnowToggle({ className, variant = "full" }: SnowToggleProps) {
    const { isSnowing, toggleSnow } = useSnow()

    if (variant === "minimal") {
        return (
            <button
                onClick={toggleSnow}
                className={cn(
                    "p-2 rounded-full transition-colors hover:bg-accent",
                    isSnowing ? "text-blue-500" : "text-muted-foreground",
                    className
                )}
                title={isSnowing ? "Вимкнути сніг" : "Увімкнути сніг"}
            >
                <Snowflake className="h-5 w-5" />
            </button>
        )
    }


    return (
        <div className={cn("flex items-center space-x-2 bg-background/80 backdrop-blur-sm border p-2 rounded-lg shadow-sm", className)}>
            <Snowflake className={cn("h-4 w-4", isSnowing ? "text-blue-400" : "text-gray-400")} />
            <Label htmlFor="snow-mode" className="text-sm font-medium cursor-pointer">
                Snow
            </Label>
            <Switch
                id="snow-mode"
                checked={isSnowing}
                onCheckedChange={toggleSnow}
            />
        </div>
    )
}