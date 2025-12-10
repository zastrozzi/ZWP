export * from './enduser.activity.facade'
export * from './enduser.address.facade'
export * from './enduser.credential.facade'
export * from './enduser.device.facade'
export * from './enduser.email.facade'
export * from './enduser.facade'
export * from './enduser.phone.facade'
export * from './enduser.session.facade'

import { EnduserActivityFacade } from './enduser.activity.facade'
import { EnduserAddressFacade } from './enduser.address.facade'
import { EnduserCredentialFacade } from './enduser.credential.facade'
import { EnduserDeviceFacade } from './enduser.device.facade'
import { EnduserEmailFacade } from './enduser.email.facade'
import { EnduserFacade } from './enduser.facade'
import { EnduserPhoneFacade } from './enduser.phone.facade'
import { EnduserSessionFacade } from './enduser.session.facade'

export const ENDUSER_FACADES = [
    EnduserActivityFacade,
    EnduserAddressFacade,
    EnduserCredentialFacade,
    EnduserDeviceFacade,
    EnduserEmailFacade,
    EnduserFacade,
    EnduserPhoneFacade,
    EnduserSessionFacade,
]