// import { Directive, OnDestroy } from "@angular/core";
// import { ZWPApplicationFacade, ZWPRouterFacade } from "../+state/facades";

// @Directive({
//     selector: "[zwpSEO]"
// })
// export class SEODirective implements OnInit, OnDestroy {
//     constructor(
//         private routerFacade: ZWPRouterFacade,
//         private applicationFacade: ZWPApplicationFacade,
//     ) {

//     }

//     ngOnInit() {
//         this.routerFacade.title$.subscribe(title => {
//             this.applicationFacade.setTitle(title)
//         })
//     }
// }