import { AccountType } from '../enums/account.type'
import { UserRole } from '../common/account.user.role'


export interface AccountResponse {
    id: string,
    dbCreatedAt: Date,
    dbUpdatedAt: Date,
    dbDeletedAt?: Date,
    awid: number,
    name: string,
    type: AccountType,
    userRole: UserRole
}