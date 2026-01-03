"use client";

import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface ObjectsPaginationProps {
    page: number;
    isLastPage: boolean;
    onPageChange: (newPage: number) => void;
}

export function ObjectsPagination({ page, isLastPage, onPageChange }: ObjectsPaginationProps) {
    return (
        <div className="flex justify-center pt-8 w-full">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (page > 1) onPageChange(page - 1);
                            }}
                            className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="#" isActive onClick={(e) => e.preventDefault()}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (!isLastPage) onPageChange(page + 1);
                            }}
                            className={isLastPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}