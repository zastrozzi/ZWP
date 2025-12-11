import { FAMILY_NAME_COLLECTION } from "../model/names/family-name.collection"
import { FEMALE_NAME_COLLECTION } from "../model/names/female.given-name.collection"
import { MALE_NAME_COLLECTION } from "../model/names/male.given-name.collection"
import { randomFromArray } from "../utils"

export const randomNameGenerator = (options?: { sex?: 'male' | 'female' | 'any', givenName?: boolean, familyName?: boolean}): string => {
    let randomGivenName: string | null = null
    let randomFamilyName: string | null = null
    if (!options || !options?.givenName === false) { 
        switch (options?.sex) {
            case 'male': randomGivenName = randomFromArray(MALE_NAME_COLLECTION); break;
            case 'female': randomGivenName = randomFromArray(FEMALE_NAME_COLLECTION); break;
            default: randomGivenName = (Math.random() >= 0.5) ? randomFromArray(FEMALE_NAME_COLLECTION) : randomFromArray(MALE_NAME_COLLECTION); break;
        }
    }
    if (!options || !options?.familyName === false) { randomFamilyName = randomFromArray(FAMILY_NAME_COLLECTION) }

    return '' + (randomGivenName ?? '') + (randomGivenName !== null && randomFamilyName !== null ? ' ' : '') + (randomFamilyName ?? '')
}