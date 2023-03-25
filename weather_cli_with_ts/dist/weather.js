var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getArgs } from './helpers/args.helpers.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import axios from 'axios';
function saveToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token) {
            printError('no token');
            return;
        }
        try {
            yield saveKeyValue(TOKEN_DICTIONARY.TOKEN, token);
            printSuccess('token saved');
        }
        catch (error) {
            if (error instanceof Error) {
                printError(error.message);
            }
        }
    });
}
function saveCity(city) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!city) {
            printError('no city');
            return;
        }
        try {
            yield saveKeyValue(TOKEN_DICTIONARY.CITY, city);
            printSuccess('city saved');
        }
        catch (error) {
            if (error instanceof Error) {
                printError(error.message);
            }
        }
    });
}
function getForcast() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const weather = yield getWeather();
            printWeather(weather);
        }
        catch (error) {
            if (error instanceof Error) {
                printError(error.message);
            }
            if (axios.isAxiosError(error)) {
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                    printError('no city');
                }
                if (((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 401) {
                    printError('no token');
                }
            }
        }
    });
}
function initCli() {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.c) {
        return saveCity(args.c);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForcast();
}
initCli();
