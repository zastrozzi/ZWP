import { Model } from '../model'
import { randomFromNonEmptyArray } from '@zwp/platform.common'

export const projectNameGenerator = (): string => {
    const projectAdjective = randomFromNonEmptyArray(Model.PROJECT_NAME_ADJECTIVES_COLLECTION)
    const projectClassifier = randomFromNonEmptyArray(Model.PROJECT_NAME_CLASSIFIERS_COLLECTION)

    return projectAdjective + ' ' + projectClassifier
}