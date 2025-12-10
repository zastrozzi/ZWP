import { Component } from '@angular/core'

export type ClassType = {new (...args: any[]): any}

export interface ComponentMap {
    [componentName: string]: ClassType
}

export type ComponentMapWithArray<T extends ComponentMap> = { 
    ALL: T[keyof T][]
}

// export type TypeOfClassType = <T extends ClassType>(component: T) => T

export const componentMap = <T extends ComponentMap>(components: T): ComponentMap & ComponentMapWithArray<T> & T => ({ ...components, ALL: Object.values(components) as T[keyof T][] })