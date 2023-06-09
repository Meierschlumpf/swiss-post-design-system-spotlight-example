import {TranslateLoader} from '@ngx-translate/core';
import {Observable, from} from 'rxjs';

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<unknown> {
    return from(import(`../../assets/i18n/${lang}.json`));
  }
}
