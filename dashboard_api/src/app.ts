import express, { Express } from "express";
import { Server } from 'http';
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { ILogger } from "./logger/logger.interface.js";
import { UserController } from "./users/users.controller.js";

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: ILogger;
	userController: UserController;
	exeptionFilter: ExeptionFilter;

	constructor(
		logger: ILogger,
		userController: UserController,
		exeptionFilter: ExeptionFilter
	) {
		this.app = express()
		this.port = 8000
		this.logger = logger
		this.userController = userController
		this.exeptionFilter = exeptionFilter
	}

	useRoutes() {
		this.app.use('/users', this.userController.router)
	}

	useExeptionsFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
	}

	public async init() {
		this.useRoutes()
		this.useExeptionsFilters()
		this.server = this.app.listen(this.port)
		this.logger.log('server started')
	}
}





















