import { v4 } from 'uuid'
import { Model } from '../model'
import { DateGeneratorOptions, generateRandomDate } from './date.generator'
import { generateRandomNumber, NumberGeneratorOptions } from './number.generator'
import { projectNameGenerator } from './project-name.generator'
import { randomEnumCase } from '@zwp/platform.common'
import { randomNameGenerator } from './random-name.generator'

export interface ProjectGeneratorOptions {
    timestamps?: DateGeneratorOptions
    projectDates?: DateGeneratorOptions
    budget?: NumberGeneratorOptions
}

export const generateRandomProject = ({
    budget = {
        min: 100,
        max: 2000,
        decimalPlaces: 0,
        step: 1
    },
    timestamps = {
        before: new Date('2026-01-01'),
        after: new Date('2025-01-01')
    },
    projectDates = {
        before: new Date('2026-01-01'),
        after: new Date('2025-01-01')
    },
    
}: ProjectGeneratorOptions = {}): Model.ProjectResponse => {
    const dbTimestamp = generateRandomDate(timestamps)
    const randomStartDate = generateRandomDate(projectDates)
    const randomEndDate = generateRandomDate({ after: randomStartDate })
    const randomId = v4()
    const randomBudget = generateRandomNumber(budget)
    const randomName = projectNameGenerator()
    return {
        id: randomId,
        dbCreatedAt: dbTimestamp,
        dbUpdatedAt: dbTimestamp,
        name: randomName,
        description: randomNameGenerator(),
        status: randomEnumCase(Model.ProjectStatus),
        startDate: randomStartDate,
        endDate: randomEndDate,
        budget: randomBudget
    }
}