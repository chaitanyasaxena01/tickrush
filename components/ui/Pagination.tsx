import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@/components/Icons";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    hasMorePages: boolean;
    baseUrl: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    hasMorePages,
    baseUrl,
}: PaginationProps) {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showPages = 5;

        if (totalPages <= showPages + 2) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            // Show pages around current
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className="flex items-center justify-center gap-1 mt-6" aria-label="Pagination">
            {/* Previous button */}
            <Link
                href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}
                className={cn(
                    "flex items-center justify-center size-10 rounded-lg transition-colors",
                    currentPage === 1
                        ? "pointer-events-none opacity-50 bg-dark-500"
                        : "bg-dark-500 hover:bg-dark-400 text-white"
                )}
                aria-disabled={currentPage === 1}
            >
                <ChevronLeft className="size-5" />
            </Link>

            {/* Page numbers */}
            {pageNumbers.map((page, idx) => {
                if (page === "...") {
                    return (
                        <span
                            key={`ellipsis-${idx}`}
                            className="flex items-center justify-center size-10 text-purple-100"
                        >
                            ...
                        </span>
                    );
                }

                const pageNum = page as number;
                const isActive = pageNum === currentPage;

                return (
                    <Link
                        key={pageNum}
                        href={`${baseUrl}?page=${pageNum}`}
                        className={cn(
                            "flex items-center justify-center size-10 rounded-lg font-medium transition-colors",
                            isActive
                                ? "bg-green-500 text-dark-900"
                                : "bg-dark-500 hover:bg-dark-400 text-white"
                        )}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {pageNum}
                    </Link>
                );
            })}

            {/* Next button */}
            <Link
                href={hasMorePages ? `${baseUrl}?page=${currentPage + 1}` : "#"}
                className={cn(
                    "flex items-center justify-center size-10 rounded-lg transition-colors",
                    !hasMorePages
                        ? "pointer-events-none opacity-50 bg-dark-500"
                        : "bg-dark-500 hover:bg-dark-400 text-white"
                )}
                aria-disabled={!hasMorePages}
            >
                <ChevronRight className="size-5" />
            </Link>
        </nav>
    );
}
