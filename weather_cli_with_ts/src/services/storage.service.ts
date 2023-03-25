import { SaveKeyValueType } from './storage.service.types';
import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather_data.json');

export enum TOKEN_DICTIONARY {
	TOKEN = 'token',
	CITY = 'city'
};

export async function saveKeyValue(key: string, value: string): Promise<void> {
	let data: SaveKeyValueType = {};

	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file.toString())
	}

	if (key === 'token') {
		data.token = value
	}

	if (key === 'city') {
		data.city = value
	}

	await promises.writeFile(filePath, JSON.stringify(data))
}

export async function getKeyValue(key: string): Promise<string | null> {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file.toString());
		return data[key]
	}

	return null
}

async function isExist(path: string): Promise<boolean> {
	try {
		await promises.stat(path)
		return true
	} catch (error) {
		return false
	}
}