import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { environment } from './environments/environment';
import { LocalizationService } from './app/core/config/localization.service';
import { AppModule } from './app/app.module';

import { TRANSLATION_JA } from '../locale/messages.ja';

if (environment.title === 'prod') {
  enableProdMode();
}
let localizationService: LocalizationService = new LocalizationService();

let defaultLanguage = localizationService.getCurrentLanguage();

platformBrowserDynamic().bootstrapModule(AppModule,
    {
        providers: [
            { provide: TRANSLATIONS, useValue: TRANSLATION_JA },
            { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
            { provide: LOCALE_ID, useValue: defaultLanguage.localeId }
        ]
    });
