const hotelMealExpenseRoutes = (path: string) => {
    const segment = 'hotel-meal'
    return {
        getHotelMealExpense: (expenseId: string) => `${path}/${segment}/${expenseId}`,
        listHotelMealExpenses: () => `${path}/${segment}`,
        updateHotelMealExpense: (expenseId: string) => `${path}/${segment}/${expenseId}`,
        deleteHotelMealExpense: (expenseId: string) => `${path}/${segment}/${expenseId}`
    }
}

const hotelMealExpenseRoutesForEmployment = (path: string) => {
    const segment = 'hotel-meal'
    return {
        createHotelMealExpense: () => `${path}/${segment}`,
        listHotelMealExpenses: hotelMealExpenseRoutes(path).listHotelMealExpenses
    }
}

const hotelMealExpenseRoutesForRebatePeriod = (path: string) => {
    const segment = 'hotel-meal'
    return {
        createHotelMealExpense: () => `${path}/${segment}`,
        listHotelMealExpenses: hotelMealExpenseRoutes(path).listHotelMealExpenses
    }
}

const otherExpenseRoutes = (path: string) => {
    const segment = 'other'
    return {
        getOtherExpense: (expenseId: string) => `${path}/${segment}/${expenseId}`,
        listOtherExpenses: () => `${path}/${segment}`,
        updateOtherExpense: (expenseId: string) => `${path}/${segment}/${expenseId}`,
        deleteOtherExpense: (expenseId: string) => `${path}/${segment}/${expenseId}`
    }
}

const otherExpenseRoutesForEmployment = (path: string) => {
    const segment = 'other'
    return {
        createOtherExpense: () => `${path}/${segment}`,
        listOtherExpenses: otherExpenseRoutes(path).listOtherExpenses
    }
}

const otherExpenseRoutesForRebatePeriod = (path: string) => {
    const segment = 'other'
    return {
        createOtherExpense: () => `${path}/${segment}`,
        listOtherExpenses: otherExpenseRoutes(path).listOtherExpenses
    }
}

const subscriptionExpenseRoutes = (path: string) => {
    const segment = 'subscription'
    return {
        getSubscriptionExpense: (expenseId: string) => `${path}/${segment}/${expenseId}`,
        listSubscriptionExpenses: () => `${path}/${segment}`,
        updateSubscriptionExpense: (expenseId: string) => `${path}/${segment}/${expenseId}`,
        deleteSubscriptionExpense: (expenseId: string) => `${path}/${segment}/${expenseId}`
    }
}

const subscriptionExpenseRoutesForSubscription = (path: string) => {
    return {
        createSubscriptionExpense: () => `${path}`,
        listSubscriptionExpenses: () => `${path}`
    }
}

const subscriptionExpenseRoutesForRebatePeriod = (path: string) => {
    const segment = 'subscription'
    return {
        createSubscriptionExpense: () => `${path}/${segment}`,
        listSubscriptionExpenses: subscriptionExpenseRoutes(path).listSubscriptionExpenses
    }
}

const expenseRoutesForRebatePeriod = (path: string) => {
    return {
        hotelMealExpenseRoutes: hotelMealExpenseRoutesForRebatePeriod(path),
        otherExpenseRoutes: otherExpenseRoutesForRebatePeriod(path),
        subscriptionExpenseRoutes: subscriptionExpenseRoutesForRebatePeriod(path)
    }
}

export const expenseRoutes = (path: string) => {
    const segment = 'expenses'
    return {
        hotelMealExpenseRoutes: hotelMealExpenseRoutes(`${path}/${segment}`),
        otherExpenseRoutes: otherExpenseRoutes(`${path}/${segment}`),
        subscriptionExpenseRoutes: subscriptionExpenseRoutes(`${path}/${segment}`),
        expenseRoutesForRebatePeriod: expenseRoutesForRebatePeriod(`${path}/${segment}`),
        hotelMealExpenseRoutesForEmployment: hotelMealExpenseRoutesForEmployment(`${path}/${segment}`),
        otherExpenseRoutesForEmployment: otherExpenseRoutesForEmployment(`${path}/${segment}`),
        subscriptionExpenseRoutesForSubscription: subscriptionExpenseRoutesForSubscription(`${path}/${segment}`)
    }
}