import { Injectable } from "@angular/core";
import { randomNameGenerator } from "../generators";

@Injectable({ providedIn: 'platform' })
export class ZWPDummyDataService {

    randomName(options?: { sex?: 'male' | 'female' | 'any', givenName?: boolean, familyName?: boolean}): string {
        return randomNameGenerator(options)
    }
}