import { NextRequest, NextResponse } from "next/server";
import { searchCoins } from "@/lib/coingecko";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ coins: [] });
    }

    try {
        const data = await searchCoins(query);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Search failed:", error);
        return NextResponse.json(
            { error: "Search failed" },
            { status: 500 }
        );
    }
}
