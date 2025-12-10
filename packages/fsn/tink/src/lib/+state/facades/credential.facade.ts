import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { CredentialLocalActions, CredentialRemoteActions } from '../actions/credential.actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkCredentialFacade', options: { skipMethodDebugger: true } })
export class TinkCredentialFacade {
    private store = inject(Store)

    // Observables from selectors
    credentialFilters$ = this.store.pipe(select(Selectors.CredentialSelectors.selectCredentialFilters))
    credentialRemotePagination$ = this.store.pipe(
        select(Selectors.CredentialSelectors.selectCredentialRemotePagination)
    )
    credentialRemoteState$ = this.store.pipe(select(Selectors.CredentialSelectors.selectCredentialRemoteState))

    credentials$ = this.store.pipe(select(Selectors.CredentialSelectors.selectAllCredentials))
    selectedCredentialId$ = this.store.pipe(select(Selectors.CredentialSelectors.selectSelectedCredentialId))
    selectedCredential$ = this.store.pipe(select(Selectors.CredentialSelectors.selectedCredential))
    filteredCredentials$ = this.store.pipe(select(Selectors.CredentialSelectors.selectFilteredCredentials))
    paginatedCredentials$ = this.store.pipe(select(Selectors.CredentialSelectors.selectPaginatedCredentials))
    paginatedFilteredCredentials$ = this.store.pipe(
        select(Selectors.CredentialSelectors.selectPaginatedFilteredCredentials)
    )

    credentialById$ = (credentialId: string) =>
        this.store.pipe(select(Selectors.CredentialSelectors.selectCredentialById(credentialId)))

    // Local Actions
    updateCredentialFilters(filters: Partial<Model.Filters.CredentialFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(CredentialLocalActions.updateCredentialFilters({ filters, triggerRemoteFetch }))
    }

    resetCredentialFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(CredentialLocalActions.resetCredentialFilters({ triggerRemoteFetch }))
    }

    resetCredentialState() {
        return this.store.dispatch(CredentialLocalActions.resetCredentialState())
    }

    initialiseCredentialState() {
        return this.store.dispatch(CredentialLocalActions.initialiseCredentialState())
    }

    selectCredential(credentialId: string) {
        return this.store.dispatch(CredentialLocalActions.selectCredential({ credentialId }))
    }

    deselectCredential() {
        return this.store.dispatch(CredentialLocalActions.deselectCredential())
    }

    resetPagination() {
        return this.store.dispatch(CredentialLocalActions.resetPagination())
    }

    // Remote Actions
    getCredential(credentialId: string) {
        return this.store.dispatch(CredentialRemoteActions.getCredential.request({ credentialId }))
    }

    listCredentials(
        tinkUserId: Nullable<string> = null,
        pagination: Nullable<
            Partial<PaginatedQueryParams<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>>
        > = null
    ) {
        return this.store.dispatch(CredentialRemoteActions.listCredentials.request({ tinkUserId, pagination }))
    }

    deleteCredential(credentialId: string) {
        return this.store.dispatch(CredentialRemoteActions.deleteCredential.request({ credentialId }))
    }

    refreshCredentials(tinkUserId: string) {
        return this.store.dispatch(CredentialRemoteActions.refreshCredentials.request({ tinkUserId }))
    }

    refreshCredential(credentialId: string) {
        return this.store.dispatch(CredentialRemoteActions.refreshCredential.request({ credentialId }))
    }

    forceRefreshCredential(credentialId: string) {
        return this.store.dispatch(CredentialRemoteActions.forceRefreshCredential.request({ credentialId }))
    }
}
