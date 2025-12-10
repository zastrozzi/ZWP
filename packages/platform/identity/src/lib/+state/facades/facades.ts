import { ADMIN_USER_FACADES } from './admin-user'
import { ENDUSER_FACADES } from './enduser'

export * from './admin-user'
export * from './enduser'

export const ALL = [
    ...ADMIN_USER_FACADES,
    ...ENDUSER_FACADES
]