import { injectable } from 'inversify/lib/annotation/injectable';
import { Logger, ILogObj } from 'tslog';
import { ILogger } from './logger.interface';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger({
			hideLogPositionForProduction: true
		})
	}

	log(...args: unknown[]): void {
		this.logger.info(...args)
	}

	error(...args: unknown[]): void {
		this.logger.error(...args)
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args)
	}
}



















