export interface WeatherResponse {
	name: string;
	weather: { description: string }[];
	main: {
		temp: string;
		feels_like: string;
		humidity: string;
	};
	wind: {
		speed: string;
	};
};

export interface WeatherDataResponse {
	data: WeatherResponse
};