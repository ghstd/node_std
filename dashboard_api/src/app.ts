import express, { Express } from "express";
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from "./logger/logger.interface";
import { TYPES } from './types';
import { UserController } from "./users/users.controller";
import 'reflect-metadata';
import { json } from "body-parser"
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService
	) {
		this.app = express()
		this.port = 8000
	}

	useMiddleware(): void {
		this.app.use(json())
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware))
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router)
	}

	useExeptionsFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
	}

	public async init(): Promise<void> {
		this.useMiddleware()
		this.useRoutes()
		this.useExeptionsFilters()
		await this.prismaService.connect()
		this.server = this.app.listen(this.port)
		this.logger.log('server started')
	}

	public close(): void {
		this.server.close()
	}
}





















