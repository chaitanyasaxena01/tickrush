import { NextRequest, NextResponse } from "next/server";
import { fetchCoinOHLC } from "@/lib/coingecko";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const coinId = searchParams.get("coinId");
    const days = searchParams.get("days");

    if (!coinId) {
        return NextResponse.json({ error: "coinId is required" }, { status: 400 });
    }

    try {
        const daysValue = days === "max" ? "max" : Number(days) || 7;
        const data = await fetchCoinOHLC(coinId, daysValue);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch OHLC data:", error);
        return NextResponse.json(
            { error: "Failed to fetch OHLC data" },
            { status: 500 }
        );
    }
}
