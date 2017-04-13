import * as jsrsasign from 'jsrsasign';

export class AuthTestHelper {
    constructor() { }

    getToken(clientSecret) {
        let oHeader = { alg: 'HS256', typ: 'JWT' };
        let tNow = jsrsasign.KJUR.jws.IntDate.get('now');
        let oPayload = {
            user: {
                id: 1,
                displayName: 'John Doe',
                userName: 'jdoe',
                description: '',
                role: 'admin'
            },
            iat: tNow,
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // 60 * 60 = 1 Hour // tEnd
        };
        let sHeader = JSON.stringify(oHeader);
        let sPayload = JSON.stringify(oPayload);
        return jsrsasign.KJUR.jws.JWS.sign('HS256', sHeader, sPayload, clientSecret);
    }

    injectToken(clientSecret, localStorageProperty) {
        let that = this;
        spyOn(localStorage, 'getItem').and.callFake(function (key, value) {
            let token = {};
            token[localStorageProperty] = that.getToken(clientSecret);
            return JSON.stringify(token);
        });

        spyOn(localStorage, 'setItem').and.callFake(function (_localStorageProperty, token) {
            return;
        });
    }
}
