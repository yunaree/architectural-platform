"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Command, SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { Kbd } from "@/components/ui/kbd"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { GitHubStarsButton } from "@/components/ui/shadcn-io/github-stars-button"

export function SiteHeader() {
    const searchInputRef = React.useRef<HTMLInputElement>(null)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                searchInputRef.current?.focus()
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const query = e.currentTarget.value.trim()

            if (query) {
                router.push(`/objects?q=${encodeURIComponent(query)}`)
            } else {
                router.push(`/objects`)
            }

            e.currentTarget.blur()
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
            <div className="flex flex-col md:flex-row md:h-14 items-center">
                <div className="flex w-full h-14 items-center justify-between">
                    <div className="mr-4 flex">
                        <Link href="/" className="mr-6 flex items-center space-x-2">
                            <Command className="h-6 w-6" />
                            <span className="hidden font-bold sm:inline-block">
                                architectural-platform.io
                              </span>
                        </Link>
                        <ModeToggle/>
                    </div>

                    <div className="flex hidden md:flex w-full max-w-md flex-col gap-6 justify-center">
                        <InputGroup>
                            <InputGroupInput
                                ref={searchInputRef}
                                onKeyDown={handleSearchKeyDown}
                                placeholder="Search..."
                            />
                            <InputGroupAddon>
                                <SearchIcon/>
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                <Kbd>⌘ K</Kbd>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>

                    <div className="flex items-center justify-end space-x-2 hidden md:flex">
                        <nav className="flex items-center">
                            <GitHubStarsButton
                                username="facebook"
                                repo="react"
                                formatted={true}
                                inViewMargin="100px"
                            />
                        </nav>
                    </div>
                </div>

                <div className="pb-4 w-full md:hidden">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            placeholder="Search..."
                            className="pl-8 h-9 w-full"
                            onKeyDown={handleSearchKeyDown}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}