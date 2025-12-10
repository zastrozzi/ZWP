const emailRoutes = (path: string) => {
    const segment = 'email-accounts'
    return {
        getEmail: (emailId: string) => `${path}/${segment}/${emailId}`,
        listEmails: () => `${path}/${segment}`,
        updateEmail: (emailId: string) => `${path}/${segment}/${emailId}`,
        deleteEmail: (emailId: string) => `${path}/${segment}/${emailId}`
    }
}

const emailRoutesForAdminUser = (path: string) => {
    const segment = 'email-accounts'
    return { 
        createEmail: () => `${path}/${segment}`,
        listEmails: emailRoutes(path).listEmails
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

const credentialRoutesForAdminUser = (path: string) => {
    const segment = 'credentials'
    return {
        createCredential: () => `${path}/${segment}`,
        listCredentials: credentialRoutes(path).listCredentials
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

const deviceRoutes = (path: string) => {
    const segment = 'devices'
    return {
        getDevice: (deviceId: string) => `${path}/${segment}/${deviceId}`,
        listDevices: () => `${path}/${segment}`
    }
}

const deviceRoutesForAdminUser = (path: string) => {
    return {
        listDevices: deviceRoutes(path).listDevices
    }
}

const activityRoutesForAdminUser = (path: string) => {
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

const sessionRoutesForAdminUser = (path: string) => {
    return {
        listSessions: sessionRoutes(path).listSessions
    }
}

export const adminUserRoutes = (path: string) => {
    const segment = 'admin-users'
    return {
        authRoutes: authRoutes(`${path}/${segment}`),
        createAdminUser: () => `${path}/${segment}`,
        getAdminUser: (adminUserId: string) => `${path}/${segment}/${adminUserId}`,
        listAdminUsers: () => `${path}/${segment}`,
        updateAdminUser: (adminUserId: string) => `${path}/${segment}/${adminUserId}`,
        deleteAdminUser: (adminUserId: string) => `${path}/${segment}/${adminUserId}`,
        emailRoutes: emailRoutes(`${path}/${segment}`),
        emailRoutesForAdminUser: (adminUserId: string) => emailRoutesForAdminUser(`${path}/${segment}/${adminUserId}`),
        credentialRoutes: credentialRoutes(`${path}/${segment}`),
        credentialRoutesForAdminUser: (adminUserId: string) => credentialRoutesForAdminUser(`${path}/${segment}/${adminUserId}`),
        deviceRoutes: deviceRoutes(`${path}/${segment}`),
        deviceRoutesForAdminUser: (adminUserId: string) => deviceRoutesForAdminUser(`${path}/${segment}/${adminUserId}`),
        activityRoutesForAdminUser: (adminUserId: string) => activityRoutesForAdminUser(`${path}/${segment}/${adminUserId}`),
        sessionRoutes: sessionRoutes(`${path}/${segment}`),
        sessionRoutesForAdminUser: (adminUserId: string) => sessionRoutesForAdminUser(`${path}/${segment}/${adminUserId}`)
    }
}