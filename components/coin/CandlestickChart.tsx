"use client";

import { useEffect, useRef, useState } from "react";

interface CandlestickChartProps {
    data: OHLCData[];
    coinId: string;
}

const PERIOD_DAYS: Record<Period, number | "max"> = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    "3months": 90,
    "6months": 180,
    yearly: 365,
    max: "max",
};

const PERIOD_LABELS: Record<Period, string> = {
    daily: "1D",
    weekly: "7D",
    monthly: "1M",
    "3months": "3M",
    "6months": "6M",
    yearly: "1Y",
    max: "Max",
};

export default function CandlestickChart({
    data: initialData,
    coinId,
}: CandlestickChartProps) {
    const [period, setPeriod] = useState<Period>("weekly");
    const [data, setData] = useState<OHLCData[]>(initialData);
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Fetch data when period changes
    useEffect(() => {
        const fetchData = async () => {
            if (period === "weekly" && initialData.length > 0) {
                setData(initialData);
                return;
            }

            setLoading(true);
            try {
                const days = PERIOD_DAYS[period];
                const response = await fetch(
                    `/api/ohlc?coinId=${coinId}&days=${days}`
                );
                if (response.ok) {
                    const newData = await response.json();
                    setData(newData);
                }
            } catch (error) {
                console.error("Failed to fetch OHLC data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [period, coinId, initialData]);

    // Draw chart
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !data.length) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        // Clear canvas
        ctx.fillStyle = "#1a2027";
        ctx.fillRect(0, 0, rect.width, rect.height);

        // Calculate price range
        const prices = data.flatMap((d) => [d[1], d[2], d[3], d[4]]);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const priceRange = maxPrice - minPrice;
        const padding = 40;
        const chartHeight = rect.height - padding * 2;
        const chartWidth = rect.width - padding * 2;

        // Draw price scale
        ctx.fillStyle = "#a3aed0";
        ctx.font = "11px monospace";
        ctx.textAlign = "right";

        const priceSteps = 5;
        for (let i = 0; i <= priceSteps; i++) {
            const price = minPrice + (priceRange * i) / priceSteps;
            const y = rect.height - padding - (i / priceSteps) * chartHeight;
            ctx.fillText(
                price >= 1 ? price.toFixed(2) : price.toFixed(6),
                padding - 5,
                y + 4
            );

            // Grid line
            ctx.strokeStyle = "rgba(163, 174, 208, 0.1)";
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(rect.width - padding, y);
            ctx.stroke();
        }

        // Draw candlesticks
        const candleWidth = Math.max(1, (chartWidth / data.length) * 0.6);
        const gap = (chartWidth - candleWidth * data.length) / (data.length + 1);

        data.forEach((candle, i) => {
            const [, open, high, low, close] = candle;
            const x = padding + gap + i * (candleWidth + gap);

            // Normalize prices to chart coordinates
            const openY =
                rect.height - padding - ((open - minPrice) / priceRange) * chartHeight;
            const closeY =
                rect.height - padding - ((close - minPrice) / priceRange) * chartHeight;
            const highY =
                rect.height - padding - ((high - minPrice) / priceRange) * chartHeight;
            const lowY =
                rect.height - padding - ((low - minPrice) / priceRange) * chartHeight;

            const isBullish = close >= open;
            const color = isBullish ? "#76da44" : "#ff685f";

            // Draw wick
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + candleWidth / 2, highY);
            ctx.lineTo(x + candleWidth / 2, lowY);
            ctx.stroke();

            // Draw body
            ctx.fillStyle = color;
            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.max(1, Math.abs(closeY - openY));
            ctx.fillRect(x, bodyTop, candleWidth, bodyHeight);
        });
    }, [data]);

    return (
        <div id="candlestick-chart">
            <div className="chart-header">
                <span>Price Chart</span>
                <div className="button-group">
                    {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={period === p ? "config-button-active" : "config-button"}
                        >
                            {PERIOD_LABELS[p]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="chart relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-dark-500/80">
                        <div className="animate-pulse text-purple-100">Loading...</div>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ height: "300px" }}
                />
            </div>
        </div>
    );
}
