import { ResultOfGetArgs } from './args.helpers.types';

export function getArgs(args: string[]): ResultOfGetArgs {
	const res: ResultOfGetArgs = {};
	const [executor, files, ...rest] = args;
	rest.forEach((value, index, array) => {
		if (value.charAt(0) === '-') {
			if (index === array.length - 1 && value.charAt(1).toLocaleLowerCase() === 'h') {
				res.h = true
			} else if (array[index + 1].charAt(0) !== '-') {
				if (value.charAt(1).toLocaleLowerCase() === 's') {
					res.c = array[index + 1]
				}
				if (value.charAt(1).toLocaleLowerCase() === 't') {
					res.t = array[index + 1]
				}
			}
		}
	})
	return res
}