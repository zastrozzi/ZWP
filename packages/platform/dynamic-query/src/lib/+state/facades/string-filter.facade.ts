import { inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common';
import { StringFilterLocalActions, StringFilterRemoteActions } from '../actions';
import { Selectors } from '../selectors';
import { Model } from '../../model';

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'StringFilterFacade', options: { skipMethodDebugger: true } })
export class StringFilterFacade {
    private store = inject(Store);

    // Observables for local filters & remote state
    stringFilterFilters$ = this.store.pipe(select(Selectors.StringFilterSelectors.selectStringFilterFilters));
    stringFilterRemotePagination$ = this.store.pipe(select(Selectors.StringFilterSelectors.selectStringFilterRemotePagination));
    stringFilterRemoteState$ = this.store.pipe(select(Selectors.StringFilterSelectors.selectStringFilterRemoteState));

    // Collections & selection
    stringFilters$ = this.store.pipe(select(Selectors.StringFilterSelectors.selectAllStringFilters));
    selectedStringFilter$ = this.store.pipe(select(Selectors.StringFilterSelectors.selectedStringFilter));
    selectedStringFilterId$ = this.store.pipe(select(Selectors.StringFilterSelectors.selectSelectedStringFilterId));
    
    // Observables for parent relationships:
    stringFiltersForSelectedStructuredQuery$ = this.store.pipe(
        select(Selectors.StringFilterSelectors.selectStringFiltersForSelectedStructuredQuery)
    );
    
    stringFiltersForSelectedFilterGroup$ = this.store.pipe(
        select(Selectors.StringFilterSelectors.selectStringFiltersForSelectedFilterGroup)
    );

    stringFilterById$ = (id: string) => this.store.pipe(select(Selectors.StringFilterSelectors.selectStringFilterById(id)));

    // Remote actions
    createStringFilter(
        parentId: string,
        parentType: 'query' | 'parentGroup',
        request: Model.CreateStringFilterRequest
    ) {
        return this.store.dispatch(
            StringFilterRemoteActions.create.request({ parentId, parentType, request })
        );
    }

    getStringFilter(stringFilterId: string) {
        return this.store.dispatch(
            StringFilterRemoteActions.get.request({ stringFilterId })
        );
    }

    listStringFilters(
        parentId: Nullable<string> | 'auto' = null,
        parentType: 'query' | 'parentGroup' | 'none' = 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.StringFilterResponse>>> = null
    ) {
        return this.store.dispatch(
            StringFilterRemoteActions.list.request({
                parentId, parentType, pagination
            })
        );
    }

    updateStringFilter(stringFilterId: string, update: Model.UpdateStringFilterRequest) {
        return this.store.dispatch(
            StringFilterRemoteActions.update.request({ stringFilterId, update })
        );
    }

    deleteStringFilter(stringFilterId: string) {
        return this.store.dispatch(
            StringFilterRemoteActions.delete.request({ stringFilterId })
        );
    }

    // Local actions
    selectStringFilter(stringFilterId: string) {
        return this.store.dispatch(
            StringFilterLocalActions.selectStringFilter({ stringFilterId })
        );
    }

    deselectStringFilter() {
        return this.store.dispatch(
            StringFilterLocalActions.deselectStringFilter()
        );
    }

    updateStringFilterFilters(
        filters: Partial<Model.StringFilterFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            StringFilterLocalActions.updateStringFilterFilters({ filters, triggerRemoteFetch })
        );
    }

    resetStringFilterFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(
            StringFilterLocalActions.resetStringFilterFilters({ triggerRemoteFetch })
        );
    }

    resetPagination() {
        return this.store.dispatch(
            StringFilterLocalActions.resetPagination()
        );
    }
}