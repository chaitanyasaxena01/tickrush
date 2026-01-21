"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, TrendingDown, X } from "@/components/Icons";
import { formatPrice, formatPercentage, cn } from "@/lib/utils";

interface SearchModalProps {
    trendingCoins?: TrendingCoin[];
}

export default function SearchModal({ trendingCoins = [] }: SearchModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchCoin[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Keyboard shortcut to open
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Search coins
    const searchCoins = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            if (response.ok) {
                const data = await response.json();
                setResults(data.coins || []);
                setSelectedIndex(0);
            }
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            searchCoins(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, searchCoins]);

    // Handle coin selection
    const handleSelect = (coinId: string) => {
        router.push(`/coins/${coinId}`);
        setIsOpen(false);
        setQuery("");
        setResults([]);
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const items = query ? results : trendingCoins;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % items.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
        } else if (e.key === "Enter" && items.length > 0) {
            e.preventDefault();
            const selectedItem = items[selectedIndex];
            const coinId = query
                ? (selectedItem as SearchCoin).id
                : (selectedItem as TrendingCoin).item.id;
            handleSelect(coinId);
        }
    };

    // Display items - search results or trending
    const displayItems = query ? results : trendingCoins;

    return (
        <div id="search-modal">
            {/* Trigger Button */}
            <button className="trigger" onClick={() => setIsOpen(true)}>
                <Search className="size-4" />
                <span>Search</span>
                <kbd className="kbd">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            {/* Modal Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Modal Content */}
                    <div
                        className="dialog fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-lg shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="cmd-input flex items-center border-b border-dark-400 px-4 py-3">
                            <Search className="size-5 text-purple-100 mr-3" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search cryptocurrencies..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-purple-100"
                            />
                            {query && (
                                <button onClick={() => setQuery("")} className="p-1">
                                    <X className="size-4 text-purple-100" />
                                </button>
                            )}
                        </div>

                        {/* Results */}
                        <div className="list max-h-96 overflow-y-auto">
                            {loading ? (
                                <div className="py-8 text-center text-purple-100">
                                    Searching...
                                </div>
                            ) : displayItems.length === 0 ? (
                                <div className="empty">
                                    {query ? "No coins found" : "Start typing to search"}
                                </div>
                            ) : (
                                <div className="group p-2">
                                    <div className="heading px-2 py-2 text-xs font-medium uppercase">
                                        {query ? (
                                            <>
                                                <Search className="size-3" />
                                                <span>Search Results</span>
                                            </>
                                        ) : (
                                            <>
                                                <TrendingUp className="size-3" />
                                                <span>Trending</span>
                                            </>
                                        )}
                                    </div>
                                    {displayItems.map((item, index) => {
                                        const coin = query
                                            ? (item as SearchCoin)
                                            : (item as TrendingCoin).item;
                                        const price = query
                                            ? (item as SearchCoin).data?.price
                                            : (item as TrendingCoin).item.data.price;
                                        const change = query
                                            ? (item as SearchCoin).data?.price_change_percentage_24h
                                            : (item as TrendingCoin).item.data.price_change_percentage_24h.usd;

                                        const { text: changeText, isPositive } = formatPercentage(change || 0);

                                        return (
                                            <div
                                                key={coin.id}
                                                className="search-item px-2 rounded-md"
                                                data-selected={index === selectedIndex}
                                                onClick={() => handleSelect(coin.id)}
                                            >
                                                <div className="coin-info">
                                                    <Image
                                                        src={coin.large || coin.thumb}
                                                        alt={coin.name}
                                                        width={36}
                                                        height={36}
                                                        className="rounded-full"
                                                    />
                                                    <div>
                                                        <span className="font-medium">{coin.name}</span>
                                                        <span className="coin-symbol">{coin.symbol}</span>
                                                    </div>
                                                </div>
                                                <span className="coin-price">
                                                    {price ? formatPrice(price) : "—"}
                                                </span>
                                                <div
                                                    className={cn(
                                                        "coin-change",
                                                        isPositive ? "text-green-500" : "text-red-500"
                                                    )}
                                                >
                                                    {isPositive ? (
                                                        <TrendingUp className="size-4" />
                                                    ) : (
                                                        <TrendingDown className="size-4" />
                                                    )}
                                                    <span>{changeText}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between px-4 py-2 border-t border-dark-400 text-xs text-purple-100">
                            <div className="flex gap-2">
                                <kbd className="kbd">↑↓</kbd>
                                <span>Navigate</span>
                            </div>
                            <div className="flex gap-2">
                                <kbd className="kbd">↵</kbd>
                                <span>Select</span>
                            </div>
                            <div className="flex gap-2">
                                <kbd className="kbd">esc</kbd>
                                <span>Close</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
