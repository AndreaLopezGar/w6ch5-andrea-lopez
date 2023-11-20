import { Router as createRouter } from 'express';
import { CharactersController } from '../controllers/characters.controller.js';
import createDebug from 'debug';

const debug = createDebug('JJK:characters:router');

export const charactersRouter = createRouter();
debug('Starting');

charactersRouter.get('/', getAll);
charactersRouter.get('/:id', getById);
charactersRouter.post('/', create);
charactersRouter.patch('/:id', update);
charactersRouter.delete('/:id', remove);
