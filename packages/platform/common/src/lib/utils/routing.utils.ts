import { ActivatedRouteSnapshot } from '@angular/router'
import { Nullable, SerialisedRoute, SerialisedRouteData } from '../model'

export const resolveChildRouteSnapshots = (snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot[] => {
    const childSnapshots: ActivatedRouteSnapshot[] = []
    let currentSnapshot: ActivatedRouteSnapshot | null = snapshot.firstChild

    while (currentSnapshot) {
        childSnapshots.push(currentSnapshot)
        currentSnapshot = currentSnapshot.firstChild
    }

    return childSnapshots
}

export const resolveRelativeChildRoutePath = (snapshot: ActivatedRouteSnapshot, prefix: string = './'): string => {
    const childSnapshots = resolveChildRouteSnapshots(snapshot)
    const relativePath = childSnapshots
        .map((child) => child.routeConfig?.path)
        .filter(Boolean)
        .join('/')
    return prefix + relativePath
}

export const getLeafRoute = (route: SerialisedRoute): SerialisedRoute => {
    if (route.firstChild) {
        return getLeafRoute(route.firstChild)
    } else {
        return route
    }
}

export const getLeafRouteNavTitle = (route: SerialisedRoute): string => {
    let currentRoute = route
    const navTitleElements: string[] = []
    while (
        currentRoute.firstChild &&
        (
            currentRoute.firstChild.data.navTitle ||
            currentRoute.firstChild.data.featureNavTitle ||
            currentRoute.firstChild.title
        )
    ) {
        currentRoute = currentRoute.firstChild
        const leaf = currentRoute.data.navTitle ?? currentRoute.data.featureNavTitle
        if (leaf) {
            navTitleElements.push(leaf)
        }
    }
    return navTitleElements.join(' | ')
}

// export const getRouteDataFlag = (route: SerialisedRoute, flag: string): Nullable<boolean> => {
//     let currentRoute = route
//     let routeDataFlag: Nullable<boolean> = null
//     while (currentRoute) {
//         const data = currentRoute.data as SerialisedRouteData | undefined
//         if (data && Object.prototype.hasOwnProperty.call(data, flag)) {
//             const val = (data as any)[flag]
//             if (typeof val === 'boolean') {
//                 routeDataFlag = val
//             } else if (val === 'true' || val === 'false') {
//                 routeDataFlag = val === 'true'
//             } else if (val != null) {
//                 routeDataFlag = Boolean(val)
//             } else {
//                 routeDataFlag = null
//             }
//             return routeDataFlag
//         }

//         if (!currentRoute.firstChild) break
//         currentRoute = currentRoute.firstChild
//     }

//     return null
// }
