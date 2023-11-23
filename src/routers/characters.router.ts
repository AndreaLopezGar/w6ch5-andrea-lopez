import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { CharactersController } from '../controllers/characters.controller.js';
import { CharactersMongoRepo } from '../repo/characters/characters.mongo.repo.js';

const debug = createDebug('W7E:characters:router');

export const charactersRouter = createRouter();
debug('Starting');

const repo = new CharactersMongoRepo();
const controller = new CharactersController(repo);

charactersRouter.get('/', controller.getAll.bind(controller));
charactersRouter.get('/:id', controller.getById.bind(controller));
charactersRouter.post('/', controller.create.bind(controller));
charactersRouter.patch('/:id', controller.update.bind(controller));
charactersRouter.delete('/:id', controller.delete.bind(controller));
