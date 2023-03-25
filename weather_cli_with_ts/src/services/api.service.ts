import axios from 'axios';
import { WeatherDataResponse, WeatherResponse } from './log.service.types';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service';

export async function getWeather(): Promise<WeatherResponse> {
	const token = await getKeyValue(TOKEN_DICTIONARY.TOKEN);
	const city = await getKeyValue(TOKEN_DICTIONARY.CITY);

	if (!token) {
		throw new Error('no token')
	}

	if (!city) {
		throw new Error('no city')
	}

	const { data }: WeatherDataResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	})
	return data
}