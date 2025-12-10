import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { AccountLocalActions, AccountRemoteActions } from "../actions";
import { Selectors } from "../selectors";
import { Model } from "../../model";

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'AWinAccountFacade', options: { skipMethodDebugger: true } })
export class AWinAccountFacade {
    private store = inject(Store)

    listAccounts(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AccountResponse>>> = null
    ) {
        return this.store.dispatch(AccountRemoteActions.list.request({pagination}))
    }

    getAccount(accountId: string) {
        return this.store.dispatch(AccountRemoteActions.get.request({ accountId }))
    }

    deleteAccount(accountId: string) {
        return this.store.dispatch(AccountRemoteActions.delete.request({ accountId }))
    }

    //refreshAccounts
}
