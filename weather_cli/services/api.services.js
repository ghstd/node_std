import axios from 'axios';
import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.services.js';

const getWeather = async () => {
	const token = await getKeyValue(TOKEN_DICTIONARY.token);
	const city = await getKeyValue(TOKEN_DICTIONARY.city);

	if (!token) {
		throw new Error('задайте ключ API с помощью -t [API_KEY]')
	}

	if (!city) {
		throw new Error('задайте город с помощью -s [CITY]')
	}

	const { data } = await axios('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	});

	return data

	// const url = new URL('https://api.openweathermap.org/data/2.5/weather');
	// url.searchParams.append('q', city)
	// url.searchParams.append('appid', token)
	// url.searchParams.append('units', 'metric')
	// url.searchParams.append('lang', 'ru')

	// https.get(url, (response) => {
	// 	let res = '';

	// 	response.on('data', (chunk) => {
	// 		res += chunk
	// 	})

	// 	response.on('end', () => {
	// 		console.log(JSON.parse(res))
	// 	})

	// 	response.on('error', (error) => { })
	// })
};

export { getWeather }
















