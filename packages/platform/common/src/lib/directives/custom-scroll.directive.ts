import { Directive, ElementRef, Renderer2, AfterViewInit, Input, HostListener, OnDestroy, inject } from '@angular/core'

@Directive({
    selector: '[zwpCustomScroll]',
})
export class CustomScrollDirective implements AfterViewInit, OnDestroy {
    @Input() scrollbarMode: 'hidden' | 'visible' | 'custom' = 'custom'
    @Input() scrollDirection: 'vertical' | 'horizontal' | 'bidirectional' = 'vertical'

    private elRef = inject(ElementRef)
    private renderer = inject(Renderer2)

    private scrollContent!: HTMLElement
    private scrollbarTrackVertical!: HTMLElement
    private scrollbarThumbVertical!: HTMLElement
    private scrollbarTrackHorizontal!: HTMLElement
    private scrollbarThumbHorizontal!: HTMLElement

    private isDraggingVertical = false
    private isDraggingHorizontal = false
    private startY = 0
    private startX = 0
    private startScrollTop = 0
    private startScrollLeft = 0

    private fadeTimeout: any

    ngAfterViewInit() {
        switch (this.scrollbarMode) {
            case 'hidden':
                this.setupHiddenScrolling()
                break
            case 'visible':
                this.setupVisibleScrolling()
                break
            case 'custom':
                this.setupCustomScrolling()
                break
        }
    }

    ngOnDestroy(): void {
        clearTimeout(this.fadeTimeout)
    }

    private setupHiddenScrolling() {
        const scrollContainer: HTMLElement = this.elRef.nativeElement
        const scrollContent = this.renderer.createElement('div')
        scrollContent.className = 'zwp-hidden-scroll-content'

        while (scrollContainer.firstChild) {
            scrollContent.appendChild(scrollContainer.firstChild)
        }
        this.renderer.appendChild(scrollContainer, scrollContent)
        this.scrollContent = scrollContent

        this.applyHiddenStyles()
    }

    private setupVisibleScrolling() {
        const scrollContainer: HTMLElement = this.elRef.nativeElement
        const scrollContent = this.renderer.createElement('div')
        scrollContent.className = 'zwp-visible-scroll-content'
        while (scrollContainer.firstChild) {
            scrollContent.appendChild(scrollContainer.firstChild)
        }
        this.renderer.appendChild(scrollContainer, scrollContent)
        this.scrollContent = scrollContent
        this.applyVisibleStyles()
    }

    private setupCustomScrolling() {
        const scrollContainer: HTMLElement = this.elRef.nativeElement
        const scrollContent = this.renderer.createElement('div')
        scrollContent.className = 'zwp-custom-scroll-content'

        while (scrollContainer.firstChild) {
            scrollContent.appendChild(scrollContainer.firstChild)
        }
        this.renderer.appendChild(scrollContainer, scrollContent)
        this.scrollContent = scrollContent

        this.scrollbarTrackVertical = this.renderer.createElement('div')
        this.scrollbarThumbVertical = this.renderer.createElement('div')
        this.scrollbarTrackHorizontal = this.renderer.createElement('div')
        this.scrollbarThumbHorizontal = this.renderer.createElement('div')

        this.scrollbarTrackVertical.className = 'zwp-custom-scrollbar-track vertical'
        this.scrollbarThumbVertical.className = 'zwp-custom-scrollbar-thumb vertical'
        this.scrollbarTrackHorizontal.className = 'zwp-custom-scrollbar-track horizontal'
        this.scrollbarThumbHorizontal.className = 'zwp-custom-scrollbar-thumb horizontal'

        this.renderer.appendChild(this.scrollbarTrackVertical, this.scrollbarThumbVertical)
        this.renderer.appendChild(this.scrollbarTrackHorizontal, this.scrollbarThumbHorizontal)
        if (this.scrollDirection !== 'horizontal') {
            this.renderer.appendChild(scrollContainer, this.scrollbarTrackVertical)
        }
        if (this.scrollDirection !== 'vertical') {
            this.renderer.appendChild(scrollContainer, this.scrollbarTrackHorizontal)
        }

        this.applyCustomStyles()
        this.attachEventListeners()
        this.updateThumbs()
    }

    private applyVisibleStyles() {
        const scrollContainer: HTMLElement = this.elRef.nativeElement
        this.renderer.setStyle(scrollContainer, 'overflow', 'hidden')
        this.renderer.setStyle(scrollContainer, 'position', 'relative')

        const scrollStyles: Partial<CSSStyleDeclaration & { WebkitOverflowScrolling: string; scrollbarWidth: string }> = {
            width: '100%',
            height: '100%',
            boxSizing: 'content-box',
            scrollbarWidth: 'thin',
            WebkitOverflowScrolling: 'touch',
        }
        if (this.scrollDirection === 'vertical') {
            scrollStyles.overflowY = 'scroll'
            scrollStyles.overflowX = 'hidden'
        } else if (this.scrollDirection === 'horizontal') {
            scrollStyles.overflowX = 'scroll'
            scrollStyles.overflowY = 'hidden'
        } else {
            scrollStyles.overflow = 'scroll'
        }
        Object.assign(this.scrollContent.style, scrollStyles)
    }

    private applyHiddenStyles() {
        const scrollContainer: HTMLElement = this.elRef.nativeElement
        this.renderer.setStyle(scrollContainer, 'overflow', 'hidden')
        this.renderer.setStyle(scrollContainer, 'position', 'relative')

        const scrollStyles: Partial<CSSStyleDeclaration & { WebkitOverflowScrolling: string; scrollbarWidth: string }> = {
            width: '100%',
            height: '100%',
            boxSizing: 'content-box',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
        }
        if (this.scrollDirection === 'vertical') {
            scrollStyles.overflowY = 'scroll'
            scrollStyles.overflowX = 'hidden'
        } else if (this.scrollDirection === 'horizontal') {
            scrollStyles.overflowX = 'scroll'
            scrollStyles.overflowY = 'hidden'
        } else {
            scrollStyles.overflow = 'scroll'
        }
        Object.assign(this.scrollContent.style, scrollStyles)
    }

    private applyCustomStyles() {
        const scrollContainer: HTMLElement = this.elRef.nativeElement
        this.renderer.setStyle(scrollContainer, 'position', 'relative')
        this.renderer.setStyle(scrollContainer, 'overflow', 'hidden')

        const scrollStyles: Partial<CSSStyleDeclaration & { WebkitOverflowScrolling: string; scrollbarWidth: string }> = {
            width: '100%',
            height: '100%',
            boxSizing: 'content-box',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
        }

        if (this.scrollDirection === 'vertical') {
            scrollStyles.overflowY = 'scroll'
            scrollStyles.overflowX = 'hidden'
        } else if (this.scrollDirection === 'horizontal') {
            scrollStyles.overflowX = 'scroll'
            scrollStyles.overflowY = 'hidden'
        } else {
            scrollStyles.overflow = 'scroll'
        }

        Object.assign(this.scrollContent.style, scrollStyles)
    }

    private attachEventListeners() {
        const showScrollbars = () => {
            this.scrollbarTrackVertical.classList.add('show')
            this.scrollbarTrackHorizontal.classList.add('show')
            clearTimeout(this.fadeTimeout)
            this.fadeTimeout = setTimeout(() => {
                this.scrollbarTrackVertical.classList.remove('show')
                this.scrollbarTrackHorizontal.classList.remove('show')
            }, 1500)
        }

        this.scrollContent.addEventListener('scroll', () => {
            this.updateThumbs()
            showScrollbars()
        })

        // this.scrollContent.addEventListener('mouseenter', showScrollbars)
        // this.scrollContent.addEventListener('mouseleave', () => {
        //     this.fadeTimeout = setTimeout(() => {
        //         this.scrollbarTrackVertical.classList.remove('show')
        //         this.scrollbarTrackHorizontal.classList.remove('show')
        //     }, 500)
        // })

        window.addEventListener('resize', () => this.updateThumbs())

        // Dragging

        if (this.scrollDirection !== 'horizontal') {
            this.scrollbarThumbVertical.addEventListener('mousedown', (e) => this.startVerticalDrag(e))
            this.scrollbarThumbVertical.addEventListener('touchstart', (e) => this.startVerticalDrag(e.touches[0]))
        }

        if (this.scrollDirection !== 'vertical') {
            this.scrollbarThumbHorizontal.addEventListener('mousedown', (e) => this.startHorizontalDrag(e))
            this.scrollbarThumbHorizontal.addEventListener('touchstart', (e) => this.startHorizontalDrag(e.touches[0]))
        }

        document.addEventListener('mousemove', (e) => this.onDrag(e))
        document.addEventListener('touchmove', (e) => this.onDrag(e.touches[0]), { passive: false })

        document.addEventListener('mouseup', () => this.endDrag())
        document.addEventListener('touchend', () => this.endDrag())
    }

    private startVerticalDrag(e: MouseEvent | Touch) {
        this.isDraggingVertical = true
        this.startY = e.clientY
        this.startScrollTop = this.scrollContent.scrollTop
        document.body.style.userSelect = 'none'
    }

    private startHorizontalDrag(e: MouseEvent | Touch) {
        this.isDraggingHorizontal = true
        this.startX = e.clientX
        this.startScrollLeft = this.scrollContent.scrollLeft
        document.body.style.userSelect = 'none'
    }

    private onDrag(e: MouseEvent | Touch) {
        if (this.isDraggingVertical) {
            const deltaY = e.clientY - this.startY
            const ratio = this.scrollContent.scrollHeight / this.scrollContent.clientHeight
            this.scrollContent.scrollTop = this.startScrollTop + deltaY * ratio
        }
        if (this.isDraggingHorizontal) {
            const deltaX = e.clientX - this.startX
            const ratio = this.scrollContent.scrollWidth / this.scrollContent.clientWidth
            this.scrollContent.scrollLeft = this.startScrollLeft + deltaX * ratio
        }
    }

    private endDrag() {
        this.isDraggingVertical = false
        this.isDraggingHorizontal = false
        document.body.style.userSelect = ''
    }

    private updateThumbs() {
        const content = this.scrollContent
        // Vertical
        if (this.scrollDirection !== 'horizontal') {
            const hasVertical = content.scrollHeight > content.clientHeight;
            if (hasVertical) {
                const vh = this.scrollContent.clientHeight / this.scrollContent.scrollHeight
                const thumbHeight = this.scrollContent.clientHeight * vh
                const thumbTop = this.scrollContent.scrollTop * vh
                this.scrollbarThumbVertical.style.height = `${thumbHeight}px`
                this.scrollbarThumbVertical.style.top = `${thumbTop}px`
            }
            else {
                this.scrollbarThumbVertical.style.height = '0px'
                this.scrollbarThumbVertical.style.top = '0px'
            }
        }

        // Horizontal
        if (this.scrollDirection !== 'vertical') {
            const hasHorizontal = content.scrollWidth > content.clientWidth
            if (hasHorizontal) {
                const hw = this.scrollContent.clientWidth / this.scrollContent.scrollWidth
                const thumbWidth = this.scrollContent.clientWidth * hw
                const thumbLeft = this.scrollContent.scrollLeft * hw
                this.scrollbarThumbHorizontal.style.width = `${thumbWidth}px`
                this.scrollbarThumbHorizontal.style.left = `${thumbLeft}px`
            }
            else {
                this.scrollbarThumbHorizontal.style.width = '0px'
                this.scrollbarThumbHorizontal.style.left = '0px'
            }
        }
    }
}
