import createDebug from 'debug';
import { Repository } from '../repo.js';
import { Character } from '../../entities/character.js';
import { CharacterModel } from './characters.mongo.models.js';
import { HttpError } from '../../types/http.error.js';

const debug = createDebug('W7E:characters:mongo:repo');

export class CharactersMongoRepo implements Repository<Character> {
  constructor() {
    debug('HOLA');
  }

  async getAll(): Promise<Character[]> {
    const result = await CharacterModel.find();
    return result;
  }

  async getById(id: string): Promise<Character> {
    const result = await CharacterModel.findById(id);
    if (!result) throw new HttpError(404, 'not found', 'Error in GetById');
    return result;
  }

  async create(newItem: Omit<Character, 'id'>): Promise<Character> {
    const result: Character = await CharacterModel.create(newItem);
    return result;
  }

  async update(
    id: string,
    updatedItem: Partial<Character>
  ): Promise<Character> {
    const result = await CharacterModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    if (!result) throw new HttpError(404, 'Not Found', 'Error in Update');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await CharacterModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Error in Delete');
    }
  }
}
