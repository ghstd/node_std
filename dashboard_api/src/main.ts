import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from "./app";
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ExeptionFilter } from "./errors/exeption.filter";
import { ILogger } from './logger/logger.interface';
import { LoggerService } from "./logger/logger.service";
import { TYPES } from './types';
import { UserController } from "./users/users.controller";
import 'reflect-metadata';
import { IUserService } from './users/users.service.interface';
import { IUserController } from './users/users.controller.interface';
import { UserService } from './users/users.service';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './users/users.repository';
import { IUsersRepository } from './users/users.repository.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope()
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
	bind<IUserController>(TYPES.UserController).to(UserController)
	bind<IUserService>(TYPES.UserService).to(UserService)
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope()
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope()
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope()
	bind<App>(TYPES.Application).to(App)
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings)
	const app = appContainer.get<App>(TYPES.Application);
	await app.init()
	return { app, appContainer }
}

export const boot = bootstrap();














