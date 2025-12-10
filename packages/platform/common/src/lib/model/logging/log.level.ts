export enum LogLevel {
    NONE = 'NONE',
    ERROR = 'ERROR',
    WARN = 'WARN',
    NOTICE = 'NOTICE',
    INFO = 'INFO',
    DEBUG = 'DEBUG'
}

export enum LogLevelPriority {
    NONE = 0,
    ERROR = 1,
    WARN = 2,
    NOTICE = 3,
    INFO = 4,
    DEBUG = 5
}

export enum LogLevelColor {
    NONE = 'black',
    ERROR = 'red',
    WARN = 'orange',
    NOTICE = 'purple',
    INFO = 'green',
    DEBUG = 'blue'
}

export const getLogLevelPriority = (logLevel: LogLevel): LogLevelPriority => {
    switch (logLevel) {
        case LogLevel.NONE: return LogLevelPriority.NONE
        case LogLevel.ERROR: return LogLevelPriority.ERROR
        case LogLevel.WARN: return LogLevelPriority.WARN
        case LogLevel.NOTICE: return LogLevelPriority.NOTICE
        case LogLevel.INFO: return LogLevelPriority.INFO
        case LogLevel.DEBUG: return LogLevelPriority.DEBUG
    }
}

export const getLogLevelColor = (logLevel: LogLevel): LogLevelColor => {
    switch (logLevel) {
        case LogLevel.NONE: return LogLevelColor.NONE
        case LogLevel.ERROR: return LogLevelColor.ERROR
        case LogLevel.WARN: return LogLevelColor.WARN
        case LogLevel.NOTICE: return LogLevelColor.NOTICE
        case LogLevel.INFO: return LogLevelColor.INFO
        case LogLevel.DEBUG: return LogLevelColor.DEBUG
    }
}