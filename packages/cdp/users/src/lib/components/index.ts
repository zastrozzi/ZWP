import * as ADMIN_USER_COMPONENTS from './admin-user'
import * as ENDUSER_COMPONENTS from './enduser'
import { AdminHomeComponent } from './admin-home.component'
import { AudienceListComponent } from './audience/audience.list.component'

export * from './admin-user'

export const INTERNAL_COMPONENTS = {
    AdminHomeComponent,
    AudienceListComponent,
    
    ADMIN_USER_COMPONENTS,
    ENDUSER_COMPONENTS,
    ALL: [
        AdminHomeComponent,
        ADMIN_USER_COMPONENTS.AdminAccountActivityComponent,
        ADMIN_USER_COMPONENTS.AdminAccountDetailsComponent,
        ADMIN_USER_COMPONENTS.AdminAccountActivityComponent,
        ADMIN_USER_COMPONENTS.AdminAccountCommunicationsComponent,
        ADMIN_USER_COMPONENTS.AdminAccountDevicesComponent,
        ADMIN_USER_COMPONENTS.AdminAccountSecurityComponent,
        ADMIN_USER_COMPONENTS.AdminUserListComponent,
        ADMIN_USER_COMPONENTS.AdminUserDetailsComponent,
        ADMIN_USER_COMPONENTS.CreateAdminUserWindowComponent,
        ADMIN_USER_COMPONENTS.CreateAdminUserEmailWindowComponent,
        ADMIN_USER_COMPONENTS.CreateAdminUserCredentialWindowComponent,
        ENDUSER_COMPONENTS.CustomersHomeComponent,
        ENDUSER_COMPONENTS.EnduserListComponent,
        ENDUSER_COMPONENTS.EnduserDetailsComponent,
        ENDUSER_COMPONENTS.EnduserAccountActivityComponent,
        ENDUSER_COMPONENTS.EnduserAccountCommunicationsComponent,
        ENDUSER_COMPONENTS.EnduserAccountDevicesComponent,
        ENDUSER_COMPONENTS.EnduserAccountSecurityComponent,
        ENDUSER_COMPONENTS.CreateEnduserCredentialWindowComponent,
        ENDUSER_COMPONENTS.CreateEnduserEmailWindowComponent,

        AudienceListComponent
    ]
}

export const EXPORTABLE_COMPONENTS = {
    ALL: [
        ADMIN_USER_COMPONENTS.AdminAccountButtonComponent,
        ADMIN_USER_COMPONENTS.AdminLoginComponent
    ]
}