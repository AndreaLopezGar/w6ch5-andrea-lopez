import debug from 'debug';
import { UsersMongoRepo } from '../repo/users/users.mongo.repo.js';
import { UsersController } from '../controllers/user.controller.js';
import { Router as createRouter } from 'express';

export const usersRouter = createRouter();
debug('Empezando');

const repo = new UsersMongoRepo();
const controller = new UsersController(repo);

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post('/register', controller.create.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
