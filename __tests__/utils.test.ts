import { describe, it, expect } from 'vitest'
import {
    formatPrice,
    formatMarketCap,
    formatPercentage,
    formatRelativeTime,
    formatSupply,
    cn,
} from '@/lib/utils'

describe('formatPrice', () => {
    it('should format small prices', () => {
        expect(formatPrice(0.00001234)).toBe('$0.000012')
        expect(formatPrice(0.5)).toBe('$0.50')
    })

    it('should format standard prices', () => {
        expect(formatPrice(100)).toBe('$100.00')
        expect(formatPrice(1.5)).toBe('$1.50')
    })

    it('should format large prices with commas', () => {
        expect(formatPrice(1000)).toBe('$1,000.00')
        expect(formatPrice(50000.50)).toBe('$50,000.50')
    })
})

describe('formatMarketCap', () => {
    it('should format trillions', () => {
        expect(formatMarketCap(1500000000000)).toBe('$1.50T')
    })

    it('should format billions', () => {
        expect(formatMarketCap(1500000000)).toBe('$1.50B')
    })

    it('should format millions', () => {
        expect(formatMarketCap(1500000)).toBe('$1.50M')
    })

    it('should format thousands', () => {
        expect(formatMarketCap(1500)).toBe('$1.50K')
    })

    it('should format small values', () => {
        expect(formatMarketCap(150)).toBe('$150.00')
    })
})

describe('formatPercentage', () => {
    it('should handle positive percentages', () => {
        const result = formatPercentage(5.5)
        expect(result.text).toBe('+5.50%')
        expect(result.isPositive).toBe(true)
    })

    it('should handle negative percentages', () => {
        const result = formatPercentage(-3.25)
        expect(result.text).toBe('-3.25%')
        expect(result.isPositive).toBe(false)
    })

    it('should handle zero', () => {
        const result = formatPercentage(0)
        expect(result.text).toBe('+0.00%')
        expect(result.isPositive).toBe(true)
    })
})

describe('formatRelativeTime', () => {
    it('should format recent timestamps', () => {
        const now = new Date()
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)
        expect(formatRelativeTime(fiveMinutesAgo.toISOString())).toBe('5m ago')
    })

    it('should format hours ago', () => {
        const now = new Date()
        const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
        expect(formatRelativeTime(twoHoursAgo.toISOString())).toBe('2h ago')
    })
})

describe('formatSupply', () => {
    it('should format supply with billions', () => {
        expect(formatSupply(21000000000)).toBe('21.00B')
    })

    it('should format supply with millions', () => {
        expect(formatSupply(21000000)).toBe('21.00M')
    })

    it('should format supply with thousands', () => {
        expect(formatSupply(21000)).toBe('21.00K')
    })
})

describe('cn utility', () => {
    it('should merge class names', () => {
        expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
    })

    it('should handle conditional classes', () => {
        expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
    })

    it('should merge tailwind classes correctly', () => {
        expect(cn('p-4', 'p-2')).toBe('p-2')
    })
})
