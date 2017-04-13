import { Injectable } from '@angular/core';
import { TRANSLATION_EN } from '../../../../locale/messages.en';
import { TRANSLATION_JA } from '../../../../locale/messages.ja';

@Injectable()
export class LocalizationService {
    userLocaleIdKey: string = 'userLocaleId';
    defaultLocaleId: string = 'en';
    constructor() { }

    getLanguages() {
        return [{
            localeId: 'en',
            name: 'English',
            resource: TRANSLATION_EN
        }, {
            localeId: 'ja',
            name: 'Japanese',
            resource: TRANSLATION_JA
        }];
    }

    getCurrentLanguage() {
        let localeId = localStorage.getItem(this.userLocaleIdKey) || this.defaultLocaleId;
        return this.getLanguages().filter(function (language) {
            return language.localeId === localeId;
        })[0];
    }

    setCurrentLanguage(localeId: string) {
        localStorage.setItem(this.userLocaleIdKey, localeId);
        window.location.reload();
    }
}
