import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { enableProdMode, getPlatform } from '@angular/core'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
    enableProdMode()
}

(getPlatform() ?? platformBrowserDynamic())
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))