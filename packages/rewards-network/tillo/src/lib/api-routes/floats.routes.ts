import { floatRouteForBrand } from './brand.routes';

export const floatRoutes = (path: string) => {
    const segment = 'floats'
    return {
        refreshFloats: () => `${path}/${segment}/refresh`,
        getFloat: (floatId: string) => `${path}/${segment}/${floatId}`,
        deleteFloat: (floatId: string) => `${path}/${segment}/${floatId}`,
        listFloats: () => `${path}/${segment}`,
        assignFloatToBrand: (floatId: string) => floatRouteForBrand(`${path}/${segment}/${floatId}`) 
    }
}
