import { BaseController } from "../common/base.controller.js";
import { LoggerService } from "../logger/logger.service.js";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from "../errors/http-error.class.js";

export class UserController extends BaseController {
	constructor(logger: LoggerService) {
		super(logger)
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register }
		])
	}

	login(req: Request, res: Response, next: NextFunction) {
		// this.ok(res, 'login')
		next(new HTTPError(401, 'не удалось авторизоваться', 'login'))
	}

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register')
	}
}























