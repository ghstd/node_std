import { getArgs } from './helpers/args.helpers.js'
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import axios from 'axios';

async function saveToken(token: string) {
	if (!token) {
		printError('no token')
		return
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.TOKEN, token)
		printSuccess('token saved')
	} catch (error) {
		if (error instanceof Error) {
			printError(error.message)
		}
	}
}

async function saveCity(city: string) {
	if (!city) {
		printError('no city')
		return
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.CITY, city)
		printSuccess('city saved')
	} catch (error) {
		if (error instanceof Error) {
			printError(error.message)
		}
	}
}

async function getForcast() {
	try {
		const weather = await getWeather();
		printWeather(weather)
	} catch (error) {
		if (error instanceof Error) {
			printError(error.message)
		}
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				printError('no city')
			}
			if (error.response?.status === 401) {
				printError('no token')
			}
		}

	}
}

function initCli() {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp()
	}
	if (args.c) {
		return saveCity(args.c)
	}
	if (args.t) {
		return saveToken(args.t)
	}
	return getForcast()
}

initCli()