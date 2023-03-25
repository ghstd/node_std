var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service';
export function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield getKeyValue(TOKEN_DICTIONARY.TOKEN);
        const city = yield getKeyValue(TOKEN_DICTIONARY.CITY);
        if (!token) {
            throw new Error('no token');
        }
        if (!city) {
            throw new Error('no city');
        }
        const { data } = yield axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: token,
                lang: 'ru',
                units: 'metric'
            }
        });
        return data;
    });
}
