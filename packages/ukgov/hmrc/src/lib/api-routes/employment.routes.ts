import { expenseRoutes } from "./expense.routes"

export const employerRoutes = (path: string) => {
    const segment = 'employers'
    return {
        createEmployer: () => `${path}/${segment}`,
        getEmployer: (employerId: string) => `${path}/${segment}/${employerId}`,
        listEmployers: () => `${path}/${segment}`,
        listEmployees: (employerId: string) => `${path}/${segment}/${employerId}/employees`,
        updateEmployer: (employerId: string) => `${path}/${segment}/${employerId}`,
        deleteEmployer: (employerId: string) => `${path}/${segment}/${employerId}`
    }
}

export const employerRoutesForEnduser = (path: string) => {
    return {
        createEmployer: employerRoutes(path).createEmployer,
        listEmployers: employerRoutes(path).listEmployers
    }
}

export const employerRepaymentRoutes = (path: string) => {
    const segment = 'employer-repayments'
    return {
        getEmployerRepayment: (employerRepaymentId: string) => `${path}/${segment}/${employerRepaymentId}`,
        listEmployerRepayments: () => `${path}/${segment}`,
        updateEmployerRepayment: (employerRepaymentId: string) => `${path}/${segment}/${employerRepaymentId}`,
        deleteEmployerRepayment: (employerRepaymentId: string) => `${path}/${segment}/${employerRepaymentId}`
    }
}

export const employerRepaymentRoutesForEmployment = (path: string) => {
    const segment = 'employer-repayments'
    return {
        createEmployerRepayment: () => `${path}/${segment}`,
        listEmployerRepayments: employerRepaymentRoutes(path).listEmployerRepayments
    }
}

export const employmentRoutes = (path: string) => {
    const segment = 'employments'
    return {
        createEmployment: () => `${path}/${segment}`,
        getEmployment: (employmentId: string) => `${path}/${segment}/${employmentId}`,
        listEmployments: () => `${path}/${segment}`,
        updateEmployment: (employmentId: string) => `${path}/${segment}/${employmentId}`,
        deleteEmployment: (employmentId: string) => `${path}/${segment}/${employmentId}`,
        employerRepaymentRoutesForEmployment: (employmentId: string) => employerRepaymentRoutesForEmployment(`${path}/${segment}/${employmentId}`),
        hotelMealExpenseRoutesForEmployment: (employmentId: string) => expenseRoutes(`${path}/${segment}/${employmentId}`).hotelMealExpenseRoutesForEmployment,
        otherExpenseRoutesForEmployment: (employmentId: string) => expenseRoutes(`${path}/${segment}/${employmentId}`).otherExpenseRoutesForEmployment
    }
}

export const employmentRoutesForEnduser = (path: string) => {
    return {
        createEmployment: employmentRoutes(path).createEmployment,
        listEmployments: employmentRoutes(path).listEmployments
    }
}