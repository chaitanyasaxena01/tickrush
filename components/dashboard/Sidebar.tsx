"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, TrendingUp, Wallet, Settings, LogOut, Bitcoin } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Market",
        icon: TrendingUp,
        href: "/dashboard/market",
        color: "text-violet-500",
    },
    {
        label: "Portfolio",
        icon: Wallet,
        href: "/dashboard/portfolio",
        color: "text-pink-700",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
        color: "text-gray-500",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[var(--glass-bg)] border-r border-[var(--glass-border)] text-[var(--glass-text)] backdrop-blur-md">
            <div className="px-3 py-2 flex-1">
                <Link href="/" className="flex items-center pl-3 mb-14">
                    <Bitcoin className="h-8 w-8 mr-4 text-[var(--glass-primary)]" />
                    <h1 className="text-2xl font-bold font-orbitron text-[var(--glass-text)]">
                        TickRush
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-[var(--glass-primary)] hover:bg-[var(--glass-border)] rounded-lg transition",
                                pathname === route.href
                                    ? "text-[var(--glass-text)] bg-[var(--glass-border)]"
                                    : "text-[var(--glass-text)] opacity-70"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <Link
                    href="/"
                    className={cn(
                        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-red-500 hover:bg-[var(--glass-border)] rounded-lg transition text-[var(--glass-text)] opacity-70"
                    )}
                >
                    <div className="flex items-center flex-1">
                        <LogOut className="h-5 w-5 mr-3 text-red-500" />
                        Logout
                    </div>
                </Link>
            </div>
        </div>
    );
}
