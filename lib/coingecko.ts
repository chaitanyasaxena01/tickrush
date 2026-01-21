// CoinGecko API base URLs
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const COINGECKO_PRO_API_URL = "https://pro-api.coingecko.com/api/v3";

function getApiUrl(): string {
    return process.env.COINGECKO_API_KEY ? COINGECKO_PRO_API_URL : COINGECKO_API_URL;
}

function getHeaders(): HeadersInit {
    const headers: HeadersInit = {
        Accept: "application/json",
    };

    if (process.env.COINGECKO_API_KEY) {
        headers["x-cg-pro-api-key"] = process.env.COINGECKO_API_KEY;
    } else if (process.env.COINGECKO_DEMO_API_KEY) {
        headers["x-cg-demo-api-key"] = process.env.COINGECKO_DEMO_API_KEY;
    }

    return headers;
}

async function fetchWithRetry<T>(
    url: string,
    options: RequestInit = {},
    retries = 3
): Promise<T> {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...getHeaders(),
                ...options.headers,
            },
            next: { revalidate: 60 }, // Cache for 60 seconds
        });

        if (!response.ok) {
            if (response.status === 429 && retries > 0) {
                // Rate limited - wait and retry
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return fetchWithRetry(url, options, retries - 1);
            }

            // Try to get error message from response
            let errorMessage = `CoinGecko API error: ${response.status}`;
            try {
                const errorBody = await response.json();
                if (errorBody.error) {
                    errorMessage = `CoinGecko API error: ${errorBody.error}`;
                }
            } catch {
                // Ignore JSON parsing errors
            }

            throw new Error(errorMessage);
        }

        return response.json();
    } catch (error) {
        if (retries > 0 && error instanceof TypeError) {
            // Network error - retry
            await new Promise((resolve) => setTimeout(resolve, 500));
            return fetchWithRetry(url, options, retries - 1);
        }
        throw error;
    }
}

function buildUrl(endpoint: string, params: QueryParams = {}): string {
    const url = new URL(`${getApiUrl()}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            url.searchParams.append(key, String(value));
        }
    });
    return url.toString();
}

/**
 * Fetch trending coins from the last 24 hours
 */
export async function fetchTrendingCoins(): Promise<{
    coins: TrendingCoin[];
}> {
    const url = buildUrl("/search/trending");
    return fetchWithRetry(url);
}

/**
 * Fetch coins with market data (paginated)
 */
export async function fetchCoinMarkets(
    page = 1,
    perPage = 50,
    options: {
        vs_currency?: string;
        order?: string;
        sparkline?: boolean;
        category?: string;
    } = {}
): Promise<CoinMarketData[]> {
    const url = buildUrl("/coins/markets", {
        vs_currency: options.vs_currency || "usd",
        order: options.order || "market_cap_desc",
        per_page: perPage,
        page,
        sparkline: options.sparkline || false,
        category: options.category,
    });
    return fetchWithRetry(url);
}

/**
 * Fetch details for a specific coin
 */
export async function fetchCoinDetails(coinId: string): Promise<CoinDetailsData> {
    const url = buildUrl(`/coins/${coinId}`, {
        localization: false,
        tickers: true,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
    });
    return fetchWithRetry(url);
}

/**
 * Fetch OHLC data for a coin
 */
export async function fetchCoinOHLC(
    coinId: string,
    days: number | "max" = 7
): Promise<OHLCData[]> {
    const url = buildUrl(`/coins/${coinId}/ohlc`, {
        vs_currency: "usd",
        days,
    });
    return fetchWithRetry(url);
}

/**
 * Fetch coin categories
 */
export async function fetchCategories(
    order: "market_cap_desc" | "market_cap_asc" | "name_asc" | "name_desc" = "market_cap_desc"
): Promise<Category[]> {
    const url = buildUrl("/coins/categories", { order });
    return fetchWithRetry(url);
}

/**
 * Search for coins
 */
export async function searchCoins(query: string): Promise<{
    coins: SearchCoin[];
}> {
    const url = buildUrl("/search", { query });
    return fetchWithRetry(url);
}

/**
 * Fetch top gainers and losers
 */
export async function fetchTopGainersLosers(
    type: "gainers" | "losers" = "gainers",
    limit = 10
): Promise<TopGainersLosers[]> {
    // CoinGecko doesn't have a direct endpoint for top gainers/losers
    // We'll fetch top coins and sort them
    const coins = await fetchCoinMarkets(1, 100, {
        order: "market_cap_desc",
    });

    const sorted = [...coins].sort((a, b) => {
        if (type === "gainers") {
            return b.price_change_percentage_24h - a.price_change_percentage_24h;
        }
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
    });

    return sorted.slice(0, limit).map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        price: coin.current_price,
        priceChangePercentage24h: coin.price_change_percentage_24h,
    }));
}

/**
 * Fetch simple price for multiple coins
 */
export async function fetchSimplePrice(
    coinIds: string[],
    currencies: string[] = ["usd"]
): Promise<Record<string, Record<string, number>>> {
    const url = buildUrl("/simple/price", {
        ids: coinIds.join(","),
        vs_currencies: currencies.join(","),
        include_24hr_change: true,
    });
    return fetchWithRetry(url);
}
