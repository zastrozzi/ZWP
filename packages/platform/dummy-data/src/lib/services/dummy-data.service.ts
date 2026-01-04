import { Injectable } from "@angular/core";
import { Generators } from "../generators";

@Injectable({ providedIn: 'root' })
export class PlatformDummyDataService {

    randomName(options?: { sex?: 'male' | 'female' | 'any', givenName?: boolean, familyName?: boolean}): string {
        return Generators.randomNameGenerator(options)
    }
}