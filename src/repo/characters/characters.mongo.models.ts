import { Schema, model } from 'mongoose';
import { Character } from '../../entities/character.js';
import createDebug from 'debug';

const debug = createDebug('W7E:model:repo');

const charactersSchema = new Schema<Character>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
});

charactersSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const CharacterModel = model(
  'Character',
  charactersSchema,
  'characters'
);

debug('Hola desde model');
