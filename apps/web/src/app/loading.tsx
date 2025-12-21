import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex h-[100vh] w-full items-center justify-center bg-background/80 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center gap-4">
                {/* Спінер */}
                <Loader2 className="h-12 w-12 animate-spin text-primary" />

                {/* Текст (опціонально) */}
                <p className="text-sm text-muted-foreground animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}