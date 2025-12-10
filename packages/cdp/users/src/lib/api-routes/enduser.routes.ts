const addressRoutes = (path: string) => {
    const segment = 'addresses'
    return {
        getAddress: (addressId: string) => `${path}/${segment}/${addressId}`,
        listAddresses: () => `${path}/${segment}`,
        updateAddress: (addressId: string) => `${path}/${segment}/${addressId}`,
        deleteAddress: (addressId: string) => `${path}/${segment}/${addressId}`
    }
}

const addressRoutesForEnduser = (path: string) => {
    const segment = 'addresses'
    return {
        createAddress: () => `${path}/${segment}`,
        listAddresses: addressRoutes(path).listAddresses
    }
}

const authRoutes = (path: string) => {
    const segment = 'auth'
    return {
        login: () => `${path}/${segment}/login`,
        logout: () => `${path}/${segment}/logout`,
        refreshToken: () => `${path}/${segment}/refresh-token`
    }
}

const credentialRoutes = (path: string) => {
    const segment = 'credentials'
    return {
        getCredential: (credentialId: string) => `${path}/${segment}/${credentialId}`,
        listCredentials: () => `${path}/${segment}`,
        updateCredential: (credentialId: string) => `${path}/${segment}/${credentialId}`,
        deleteCredential: (credentialId: string) => `${path}/${segment}/${credentialId}`
    }
}

const credentialRoutesForEnduser = (path: string) => {
    const segment = 'credentials'
    return {
        createCredential: () => `${path}/${segment}`,
        listCredentials: credentialRoutes(path).listCredentials
    }
}

const emailRoutes = (path: string) => {
    const segment = 'email-accounts'
    return {
        getEmail: (emailId: string) => `${path}/${segment}/${emailId}`,
        listEmails: () => `${path}/${segment}`,
        updateEmail: (emailId: string) => `${path}/${segment}/${emailId}`,
        deleteEmail: (emailId: string) => `${path}/${segment}/${emailId}`
    }
}

const emailRoutesForEnduser = (path: string) => {
    const segment = 'email-accounts'
    return {
        createEmail: () => `${path}/${segment}`,
        listEmails: emailRoutes(path).listEmails
    }
}

const phoneRoutes = (path: string) => {
    const segment = 'phone-numbers'
    return {
        getPhone: (phoneId: string) => `${path}/${segment}/${phoneId}`,
        listPhones: () => `${path}/${segment}`,
        updatePhone: (phoneId: string) => `${path}/${segment}/${phoneId}`,
        deletePhone: (phoneId: string) => `${path}/${segment}/${phoneId}`
    }
}

const phoneRoutesForEnduser = (path: string) => {
    const segment = 'phone-numbers'
    return {
        createPhone: () => `${path}/${segment}`,
        listPhones: phoneRoutes(path).listPhones
    }
}

const deviceRoutes = (path: string) => {
    const segment = 'devices'
    return {
        getDevice: (deviceId: string) => `${path}/${segment}/${deviceId}`,
        listDevices: () => `${path}/${segment}`
    }
}

const deviceRoutesForEnduser = (path: string) => {
    return {
        listDevices: deviceRoutes(path).listDevices
    }
}


const activityRoutesForEnduser = (path: string) => {
    const segment = 'activity'
    return {
        listActivity: () => `${path}/${segment}`
    }
}

const sessionRoutes = (path: string) => {
    const segment = 'sessions'
    return {
        getSession: (sessionId: string) => `${path}/${segment}/${sessionId}`,
        listSessions: () => `${path}/${segment}`,
        invalidateSession: (sessionId: string) => `${path}/${segment}/${sessionId}/invalidate`
    }
}

const sessionRoutesForEnduser = (path: string) => {
    return {
        listSessions: sessionRoutes(path).listSessions
    }
}

export const enduserRoutes = (path: string) => {
    const segment = 'endusers'
    return {
        authRoutes: authRoutes(`${path}/${segment}`),
        createEnduser: () => `${path}/${segment}`,
        getEnduser: (enduserId: string) => `${path}/${segment}/${enduserId}`,
        listEndusers: () => `${path}/${segment}`,
        updateEnduser: (enduserId: string) => `${path}/${segment}/${enduserId}`,
        deleteEnduser: (enduserId: string) => `${path}/${segment}/${enduserId}`,
        addressRoutes: addressRoutes(`${path}/${segment}`),
        emailRoutes: emailRoutes(`${path}/${segment}`),
        credentialRoutes: credentialRoutes(`${path}/${segment}`),
        phoneRoutes: phoneRoutes(`${path}/${segment}`),
        deviceRoutes: deviceRoutes(`${path}/${segment}`),
        addressRoutesForEnduser: (enduserId: string) => addressRoutesForEnduser(`${path}/${segment}/${enduserId}`),
        emailRoutesForEnduser: (enduserId: string) => emailRoutesForEnduser(`${path}/${segment}/${enduserId}`),
        credentialRoutesForEnduser: (enduserId: string) => credentialRoutesForEnduser(`${path}/${segment}/${enduserId}`),
        phoneRoutesForEnduser: (enduserId: string) => phoneRoutesForEnduser(`${path}/${segment}/${enduserId}`),
        deviceRoutesForEnduser: (enduserId: string) => deviceRoutesForEnduser(`${path}/${segment}/${enduserId}`),
        activityRoutesForEnduser: (enduserId: string) => activityRoutesForEnduser(`${path}/${segment}/${enduserId}`),
        sessionRoutes: sessionRoutes(`${path}/${segment}`),
        sessionRoutesForEnduser: (enduserId: string) => sessionRoutesForEnduser(`${path}/${segment}/${enduserId}`),

    }
}