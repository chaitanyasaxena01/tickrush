import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
    TrendingUp,
    TrendingDown,
    Search,
    X,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Globe,
    FileText,
    ArrowDownUp,
} from '@/components/Icons'

describe('Icons Component', () => {
    describe('TrendingUp', () => {
        it('should render svg element', () => {
            render(<TrendingUp />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })

        it('should apply className prop', () => {
            render(<TrendingUp className="text-green-500" />)
            const svg = document.querySelector('svg')
            expect(svg).toHaveClass('text-green-500')
        })

        it('should apply size prop', () => {
            render(<TrendingUp size={32} />)
            const svg = document.querySelector('svg')
            expect(svg).toHaveAttribute('width', '32')
            expect(svg).toHaveAttribute('height', '32')
        })
    })

    describe('TrendingDown', () => {
        it('should render svg element', () => {
            render(<TrendingDown />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    })

    describe('Search', () => {
        it('should render svg element', () => {
            render(<Search />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    })

    describe('X', () => {
        it('should render svg element', () => {
            render(<X />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    })

    describe('ChevronLeft', () => {
        it('should render svg element', () => {
            render(<ChevronLeft />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    })

    describe('ChevronRight', () => {
        it('should render svg element', () => {
            render(<ChevronRight />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    })

    describe('ExternalLink', () => {
        it('should render svg element', () => {
            render(<ExternalLink />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    })

    describe('Globe', () => {
        it('should render svg element', () => {
            render(<Globe />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    })

    describe('FileText', () => {
        it('should render svg element', () => {
            render(<FileText />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    })

    describe('ArrowDownUp', () => {
        it('should render svg element', () => {
            render(<ArrowDownUp />)
            const svg = document.querySelector('svg')
            expect(svg).toBeInTheDocument()
        })
    })
})
