import { Injectable } from "@angular/core"
import { select, Store } from "@ngrx/store"
import { v4 } from "uuid"
import { ZWPDebuggableInjectable } from '../../decorators'
import { PersistenceProfileEntity } from "../../model"
import { PersistenceProfileActions } from "../actions"
import { PersistenceProfileSelectors } from "../selectors"

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPPersistenceProfileFacade', options: { skipMethodDebugger: true } })
export class ZWPPersistenceProfileFacade {
    constructor(private store: Store) {
        // super('ZWPPersistenceProfileFacade', { skipMethodDebugger: true })
    }

    allPersistenceProfilesWithSelection$ = this.store.pipe(select(PersistenceProfileSelectors.allPersistenceProfilesWithSelection))
    selectedPersistenceProfile$ = this.store.pipe(select(PersistenceProfileSelectors.selectedPersistenceProfile))
    selectedPersistenceProfileId$ = this.store.pipe(select(PersistenceProfileSelectors.selectedPersistenceProfileId))

    createPersistenceProfile(profileName: string) {
        const persistenceProfile: PersistenceProfileEntity = {
            id: v4(),
            profileName: profileName
        }

        this.store.dispatch(PersistenceProfileActions.create({ persistenceProfile }))
    }

    selectPersistenceProfile(id: string) {
        this.store.dispatch(PersistenceProfileActions.setSelected({ id }))
    }

    deselectPersistenceProfile() {
        this.store.dispatch(PersistenceProfileActions.setSelected({ id: null}))
    }

    removePersistenceProfile(id: string) {
        this.store.dispatch(PersistenceProfileActions.remove({ id }))
    }

    removeAllPersistenceProfiles() {
        this.store.dispatch(PersistenceProfileActions.removeAllRequest())
    }
}