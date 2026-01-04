import { DummyDataFacade } from './dummy-data.facade'
import { PlatformDummyDataProjectFacade } from './project.facade'
export * from './dummy-data.facade'
export * from './project.facade'

export const ALL = [
    DummyDataFacade,
    PlatformDummyDataProjectFacade
]