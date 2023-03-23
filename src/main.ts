import {enableProdMode, LOCALE_ID} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {setActiveLang} from './app/common/language-configuration';

if (environment.production) {
  enableProdMode();
}

const providers = [
    {provide: LOCALE_ID, useValue: setActiveLang()}
];


platformBrowserDynamic([providers])
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
