import { Character } from '../entities/character';
import { Repository } from './repo';
import fs from 'fs/promises';
import createDebug from 'debug';
import { HttpError } from '../types/http.error.js';

const debug = createDebug('JJK:characters:file:repo');
export class CharactersFileRepo implements Repository<Character> {
  file: string;
  characters: Character[];
  constructor() {
    debug('Instanciando');
    this.file = './data/data.json';
    this.characters = [];
    this.loadData();
  }

  async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf8' });
    this.characters = JSON.parse(data);
  }

  async getAll(): Promise<Character[]> {
    return this.characters;
  }

  async getById(id: string): Promise<Character> {
    const result = this.characters.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not found', 'Error in GetById');
    return result;
  }

  async create(newItem: Omit<Character, 'id'>): Promise<Character> {
    const result: Character = { ...newItem, id: crypto.randomUUID() };
    const newCharacters = [...this.characters, result];
    await this.save(newCharacters as Character[]);
    return result;
  }

  async update(
    id: string,
    updatedItem: Partial<Character>
  ): Promise<Character> {
    let result = this.characters.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not found', 'Error in Upadate');
    result = { ...result, ...updatedItem };
    const newCharacters = this.characters.map((item) =>
      item.id === id ? result : item
    );
    await this.save(newCharacters as Character[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newCharacters = this.characters.filter((item) => item.id !== id);
    if (newCharacters.length === this.characters.length) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    await this.save(newCharacters);
  }

  private async save(newCharacters: Character[]) {
    await fs.writeFile(this.file, JSON.stringify(newCharacters), {
      encoding: 'utf-8',
    });
    this.characters = newCharacters;
  }
}
