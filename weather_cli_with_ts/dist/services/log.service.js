import chalk from 'chalk';
import dedent from 'dedent-js';
const printError = (value) => {
    console.log(`${chalk.bgRed(' Error ')} ${value}`);
};
const printSuccess = (value) => {
    console.log(`${chalk.bgGreen(' Success ')} ${value}`);
};
const printHelp = () => {
    console.log(dedent `${chalk.bgBlue(' Help ')}
		без параметров - вывод погоды
		-s [City] - для установки города
		-t [API_KEY] - для сохранения токена
		-h - для вывода помощи
		`);
};
const printWeather = (res) => {
    console.log(dedent `${chalk.bgYellowBright(' Weather ')} город ${res.name}
		${res.weather[0].description}
		температура: ${res.main.temp} C
		ощущается как: ${res.main.feels_like} C
		влажность: ${res.main.humidity} %
		скорость ветра: ${res.wind.speed} м/с
		`);
};
export { printError, printSuccess, printHelp, printWeather };
