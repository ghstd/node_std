var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
const filePath = join(homedir(), 'weather_data.json');
export var TOKEN_DICTIONARY;
(function (TOKEN_DICTIONARY) {
    TOKEN_DICTIONARY["TOKEN"] = "token";
    TOKEN_DICTIONARY["CITY"] = "city";
})(TOKEN_DICTIONARY || (TOKEN_DICTIONARY = {}));
;
export function saveKeyValue(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = {};
        if (yield isExist(filePath)) {
            const file = yield promises.readFile(filePath);
            data = JSON.parse(file.toString());
        }
        if (key === 'token') {
            data.token = value;
        }
        if (key === 'city') {
            data.city = value;
        }
        yield promises.writeFile(filePath, JSON.stringify(data));
    });
}
export function getKeyValue(key) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield isExist(filePath)) {
            const file = yield promises.readFile(filePath);
            const data = JSON.parse(file.toString());
            return data[key];
        }
        return null;
    });
}
function isExist(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises.stat(path);
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
