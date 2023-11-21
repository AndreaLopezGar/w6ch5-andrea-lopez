import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { CharactersController } from '../controllers/characters.controller.js';

const debug = createDebug('JJK:characters:router');

export const charactersRouter = createRouter();
debug('Starting');

const controller = new CharactersController();

charactersRouter.get('/', controller.getAll.bind(controller));
charactersRouter.get('/search', controller.search.bind(controller));
charactersRouter.get('/:id', controller.getById.bind(controller));
charactersRouter.post('/', controller.create.bind(controller));
charactersRouter.patch('/:id', controller.update.bind(controller));
charactersRouter.patch('addUser/:id', controller.update.bind(controller));
charactersRouter.patch('removeUser/:id', controller.update.bind(controller));
charactersRouter.delete('/:id', controller.delete.bind(controller));
