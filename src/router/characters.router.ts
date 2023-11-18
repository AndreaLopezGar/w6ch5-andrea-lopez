import { Router as createRouter } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../controller/character.controller.js';

export const charactersRouter = createRouter();

charactersRouter.get('/', getAll);
charactersRouter.get('/:id', getById);
charactersRouter.post('/', create);
charactersRouter.patch('/:id', update);
charactersRouter.delete('/:id', remove);
