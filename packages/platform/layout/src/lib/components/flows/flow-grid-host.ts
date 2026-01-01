/**
 * Lightweight host interface implemented by `FlowGridComponent` so directives
 * can register themselves without creating a circular import.
 */
export abstract class FlowGridHost {
    abstract registerItem(item: any): void
    abstract unregisterItem(item: any): void
}
