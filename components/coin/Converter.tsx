"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowDownUp } from "@/components/Icons";

interface ConverterProps {
    symbol: string;
    icon: string;
    priceList: Record<string, number>;
}

const CURRENCIES = [
    { code: "usd", name: "US Dollar", symbol: "$" },
    { code: "eur", name: "Euro", symbol: "€" },
    { code: "gbp", name: "British Pound", symbol: "£" },
    { code: "jpy", name: "Japanese Yen", symbol: "¥" },
    { code: "inr", name: "Indian Rupee", symbol: "₹" },
    { code: "btc", name: "Bitcoin", symbol: "₿" },
    { code: "eth", name: "Ethereum", symbol: "Ξ" },
];

export default function Converter({ symbol, icon, priceList }: ConverterProps) {
    const [amount, setAmount] = useState<string>("1");
    const [targetCurrency, setTargetCurrency] = useState("usd");

    const convertedValue = useMemo(() => {
        const numAmount = parseFloat(amount) || 0;
        const rate = priceList[targetCurrency] || 0;
        return numAmount * rate;
    }, [amount, targetCurrency, priceList]);

    const formatOutput = (value: number): string => {
        const currency = CURRENCIES.find((c) => c.code === targetCurrency);
        const prefix = currency?.symbol || "";

        if (targetCurrency === "btc" || targetCurrency === "eth") {
            return `${prefix}${value.toFixed(8)}`;
        }

        if (value >= 1000000) {
            return `${prefix}${(value / 1000000).toFixed(2)}M`;
        }
        if (value >= 1000) {
            return `${prefix}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
        }
        return `${prefix}${value.toFixed(2)}`;
    };

    return (
        <div id="converter">
            <h4>💱 Converter</h4>
            <div className="panel">
                <div className="input-wrapper">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="input"
                        placeholder="Enter amount"
                        min="0"
                        step="any"
                    />
                    <div className="coin-info">
                        <Image
                            src={icon}
                            alt={symbol}
                            width={24}
                            height={24}
                            className="rounded-full"
                        />
                        <p>{symbol.toUpperCase()}</p>
                    </div>
                </div>

                <div className="divider">
                    <div className="line" />
                    <ArrowDownUp className="icon" />
                </div>

                <div className="output-wrapper">
                    <p>{formatOutput(convertedValue)}</p>
                    <select
                        value={targetCurrency}
                        onChange={(e) => setTargetCurrency(e.target.value)}
                        className="select-trigger bg-dark-400 border-none rounded px-3 py-2 text-purple-100 cursor-pointer"
                    >
                        {CURRENCIES.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code.toUpperCase()} - {currency.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
