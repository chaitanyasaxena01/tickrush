import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock fetch for API tests
const mockFetch = vi.fn()
global.fetch = mockFetch

// We need to import after mocking fetch
import {
    fetchTrendingCoins,
    fetchCoinMarkets,
    fetchCoinDetails,
    fetchCoinOHLC,
    fetchCategories,
    searchCoins,
    fetchTopGainersLosers,
    fetchSimplePrice,
} from '@/lib/coingecko'

beforeEach(() => {
    mockFetch.mockReset()
})

describe('CoinGecko API Client', () => {
    describe('fetchTrendingCoins', () => {
        it('should fetch trending coins successfully', async () => {
            const mockData = {
                coins: [
                    { item: { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc' } },
                    { item: { id: 'ethereum', name: 'Ethereum', symbol: 'eth' } },
                ],
            }

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })

            const result = await fetchTrendingCoins()
            expect(result.coins).toHaveLength(2)
            expect(result.coins[0].item.id).toBe('bitcoin')
        })

        it('should throw error on API failure', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                json: async () => ({ error: 'Internal Server Error' }),
            })

            await expect(fetchTrendingCoins()).rejects.toThrow('CoinGecko API error')
        })
    })

    describe('fetchCoinMarkets', () => {
        it('should fetch coin markets with default params', async () => {
            const mockData = [
                { id: 'bitcoin', current_price: 50000, market_cap: 1000000000000 },
            ]

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })

            const result = await fetchCoinMarkets()
            expect(result).toHaveLength(1)
            expect(result[0].id).toBe('bitcoin')
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('vs_currency=usd'),
                expect.any(Object)
            )
        })

        it('should handle pagination params', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => [],
            })

            await fetchCoinMarkets(2, 25)
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('page=2'),
                expect.any(Object)
            )
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('per_page=25'),
                expect.any(Object)
            )
        })
    })

    describe('fetchCoinDetails', () => {
        it('should fetch coin details by id', async () => {
            const mockData = {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'btc',
                market_data: { current_price: { usd: 50000 } },
            }

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })

            const result = await fetchCoinDetails('bitcoin')
            expect(result.id).toBe('bitcoin')
            expect(result.name).toBe('Bitcoin')
        })
    })

    describe('fetchCoinOHLC', () => {
        it('should fetch OHLC data', async () => {
            const mockData = [
                [1609459200000, 29000, 29500, 28500, 29200],
                [1609545600000, 29200, 30000, 29000, 29800],
            ]

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })

            const result = await fetchCoinOHLC('bitcoin', 7)
            expect(result).toHaveLength(2)
        })
    })

    describe('fetchCategories', () => {
        it('should fetch categories with order', async () => {
            const mockData = [
                { name: 'DeFi', market_cap: 50000000000 },
                { name: 'NFT', market_cap: 30000000000 },
            ]

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })

            const result = await fetchCategories('market_cap_desc')
            expect(result).toHaveLength(2)
            expect(result[0].name).toBe('DeFi')
        })
    })

    describe('searchCoins', () => {
        it('should search coins by query', async () => {
            const mockData = {
                coins: [
                    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
                    { id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'BCH' },
                ],
            }

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })

            const result = await searchCoins('bitcoin')
            expect(result.coins).toHaveLength(2)
            expect(mockFetch).toHaveBeenCalledWith(
                expect.stringContaining('query=bitcoin'),
                expect.any(Object)
            )
        })
    })

    describe('fetchTopGainersLosers', () => {
        it('should fetch and sort by gainers', async () => {
            const mockData = [
                { id: 'coin1', name: 'Coin 1', symbol: 'C1', image: '', current_price: 1, price_change_percentage_24h: 10 },
                { id: 'coin2', name: 'Coin 2', symbol: 'C2', image: '', current_price: 2, price_change_percentage_24h: 5 },
                { id: 'coin3', name: 'Coin 3', symbol: 'C3', image: '', current_price: 3, price_change_percentage_24h: 15 },
            ]

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })

            const result = await fetchTopGainersLosers('gainers', 2)
            expect(result).toHaveLength(2)
            expect(result[0].id).toBe('coin3') // Highest gain
            expect(result[1].id).toBe('coin1')
        })

        it('should fetch and sort by losers', async () => {
            const mockData = [
                { id: 'coin1', name: 'Coin 1', symbol: 'C1', image: '', current_price: 1, price_change_percentage_24h: -10 },
                { id: 'coin2', name: 'Coin 2', symbol: 'C2', image: '', current_price: 2, price_change_percentage_24h: -5 },
                { id: 'coin3', name: 'Coin 3', symbol: 'C3', image: '', current_price: 3, price_change_percentage_24h: -15 },
            ]

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })

            const result = await fetchTopGainersLosers('losers', 2)
            expect(result).toHaveLength(2)
            expect(result[0].id).toBe('coin3') // Biggest loss
            expect(result[1].id).toBe('coin1')
        })
    })

    describe('fetchSimplePrice', () => {
        it('should fetch prices for multiple coins', async () => {
            const mockData = {
                bitcoin: { usd: 50000, usd_24h_change: 2.5 },
                ethereum: { usd: 3000, usd_24h_change: 1.2 },
            }

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            })

            const result = await fetchSimplePrice(['bitcoin', 'ethereum'], ['usd'])
            expect(result.bitcoin.usd).toBe(50000)
            expect(result.ethereum.usd).toBe(3000)
        })
    })

    describe('Rate limiting and retries', () => {
        it('should retry on 429 status', async () => {
            mockFetch
                .mockResolvedValueOnce({
                    ok: false,
                    status: 429,
                    json: async () => ({}),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    json: async () => ({ coins: [] }),
                })

            const result = await fetchTrendingCoins()
            expect(result.coins).toEqual([])
            expect(mockFetch).toHaveBeenCalledTimes(2)
        })
    })
})
