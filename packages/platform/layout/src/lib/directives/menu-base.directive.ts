import { AfterContentInit, Directive, OnDestroy, OnInit } from "@angular/core";

@Directive()
export class _MenuBaseDirective implements AfterContentInit, OnInit, OnDestroy {
    ngAfterContentInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    
}