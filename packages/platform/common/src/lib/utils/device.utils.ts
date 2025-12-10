export const isTouchDevice = (): boolean => {
    if (typeof window === 'undefined') { return false }
    return ('ontouchstart' in window || navigator.maxTouchPoints > 0 || (navigator as unknown as { msMaxTouchPoints: number }).msMaxTouchPoints > 0)
}