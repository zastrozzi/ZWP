import { offerCategoryRoutesForCategory, offerCategoryRoutesForNestedCategory } from './offer-category.routes'
import { offerRoutesForCategory } from './offer.routes'

export const categoryRoutes = (path: string) => {
    const segment = 'categories'
    return {
        createCategory: () => `${path}/${segment}`,
        listCategories: () => `${path}/${segment}`,
        getCategory: (categoryId: string) => `${path}/${segment}/${categoryId}`,
        updateCategory: (categoryId: string) => `${path}/${segment}/${categoryId}`,
        deleteCategory: (categoryId: string) => `${path}/${segment}/${categoryId}`,
        subcategoryRoutesForCategory: (categoryId: string) => subcategoryRoutesForCategory(`${path}/${segment}/${categoryId}`),
        offerRoutesForCategory: (categoryId: string) => offerRoutesForCategory(`${path}/${segment}/${categoryId}`),
        offerCategoryRoutesForCategory: (categoryId: string) => offerCategoryRoutesForCategory(`${path}/${segment}/${categoryId}`)
    }
}

export const subcategoryRoutesForCategory = (path: string) => {
    const segment = 'subcategories'
    return {
        createSubcategory: () => `${path}/${segment}`,
        listSubcategories: () => `${path}/${segment}`
    }
}

export const categoryRoutesForOffer = (path: string) => {
    const segment = 'categories'
    return {
        listCategories: () => `${path}/${segment}`,
        offerCategoryRoutesForNestedCategory: (categoryId: string) => offerCategoryRoutesForNestedCategory(`${path}/${segment}/${categoryId}`)
    }
}