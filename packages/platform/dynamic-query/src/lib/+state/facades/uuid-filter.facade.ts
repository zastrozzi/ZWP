import { inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common';
import { UUIDFilterLocalActions, UUIDFilterRemoteActions } from '../actions';
import { Selectors } from '../selectors';
import { Model } from '../../model';

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'UUIDFilterFacade', options: { skipMethodDebugger: true } })
export class UUIDFilterFacade {
    private store = inject(Store);

    // Observables for local filters & remote state
    uuidFilterFilters$ = this.store.pipe(select(Selectors.UUIDFilterSelectors.selectUUIDFilterFilters));
    uuidFilterRemotePagination$ = this.store.pipe(select(Selectors.UUIDFilterSelectors.selectUUIDFilterRemotePagination));
    uuidFilterRemoteState$ = this.store.pipe(select(Selectors.UUIDFilterSelectors.selectUUIDFilterRemoteState));

    // Collections & selection
    uuidFilters$ = this.store.pipe(select(Selectors.UUIDFilterSelectors.selectAllUUIDFilters));
    selectedUUIDFilter$ = this.store.pipe(select(Selectors.UUIDFilterSelectors.selectedUUIDFilter));
    selectedUUIDFilterId$ = this.store.pipe(select(Selectors.UUIDFilterSelectors.selectSelectedUUIDFilterId));
    
    // Observables for parent relationships:
    uuidFiltersForSelectedStructuredQuery$ = this.store.pipe(
        select(Selectors.UUIDFilterSelectors.selectUUIDFiltersForSelectedStructuredQuery)
    );
    
    uuidFiltersForSelectedFilterGroup$ = this.store.pipe(
        select(Selectors.UUIDFilterSelectors.selectUUIDFiltersForSelectedFilterGroup)
    );

    uuidFilterById$ = (id: string) => this.store.pipe(select(Selectors.UUIDFilterSelectors.selectUUIDFilterById(id)));

    // Remote actions
    createUUIDFilter(
        parentId: string,
        parentType: 'query' | 'parentGroup',
        request: Model.CreateUUIDFilterRequest
    ) {
        return this.store.dispatch(
            UUIDFilterRemoteActions.create.request({ parentId, parentType, request })
        );
    }

    getUUIDFilter(uuidFilterId: string) {
        return this.store.dispatch(
            UUIDFilterRemoteActions.get.request({ uuidFilterId })
        );
    }

    listUUIDFilters(
        parentId: Nullable<string> | 'auto' = null,
        parentType: 'query' | 'parentGroup' | 'none' = 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.UUIDFilterResponse>>> = null
    ) {
        return this.store.dispatch(
            UUIDFilterRemoteActions.list.request({
                parentId, parentType, pagination
            })
        );
    }

    updateUUIDFilter(uuidFilterId: string, update: Model.UpdateUUIDFilterRequest) {
        return this.store.dispatch(
            UUIDFilterRemoteActions.update.request({ uuidFilterId, update })
        );
    }

    deleteUUIDFilter(uuidFilterId: string) {
        return this.store.dispatch(
            UUIDFilterRemoteActions.delete.request({ uuidFilterId })
        );
    }

    // Local actions
    selectUUIDFilter(uuidFilterId: string) {
        return this.store.dispatch(
            UUIDFilterLocalActions.selectUUIDFilter({ uuidFilterId })
        );
    }

    deselectUUIDFilter() {
        return this.store.dispatch(
            UUIDFilterLocalActions.deselectUUIDFilter()
        );
    }

    updateUUIDFilterFilters(
        filters: Partial<Model.UUIDFilterFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            UUIDFilterLocalActions.updateUUIDFilterFilters({ filters, triggerRemoteFetch })
        );
    }

    resetUUIDFilterFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(
            UUIDFilterLocalActions.resetUUIDFilterFilters({ triggerRemoteFetch })
        );
    }

    resetPagination() {
        return this.store.dispatch(
            UUIDFilterLocalActions.resetPagination()
        );
    }
}