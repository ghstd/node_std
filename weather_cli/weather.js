#!/usr/bin/env node
import { getArgs } from './helpers/args.helpers.js'
import { getWeather } from './services/api.services.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.services.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.services.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('не передан токен')
		return
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token)
		printSuccess('токен сохранен')
	} catch (e) {
		printError(e.message)
	}
};

const saveCity = async (city) => {
	if (!city.length) {
		printError('не указан город')
		return
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city)
		printSuccess('город сохранен')
	} catch (e) {
		printError(e.message)
	}
};


const getForcast = async () => {
	try {
		const weather = await getWeather();
		printWeather(weather)

	} catch (error) {
		if (error?.response?.status === 404) {
			printError('неверно указан город')
		} else if (error?.response?.status === 401) {
			printError('неверно указан токен')
		} else {
			printError(error.message)
		}
	}
};

const initCli = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp()
	}

	if (args.s) {
		return saveCity(args.s)
	}

	if (args.t) {
		return saveToken(args.t)
	}

	return getForcast()
};

initCli()




























