import { Request, Response } from 'express';
import fs from 'fs';
import { Character } from '../model/character.js';

const dataFilePath = './api/db.json';
export let dataArray: Character[] = [];

try {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
  dataArray = JSON.parse(rawData).characters || [];
} catch (error) {
  console.error('Error al leer el archivo db.json:', error);
}

export const getAll = (_req: Request, res: Response) => {
  res.json(dataArray);
};

export const getById = (req: Request, res: Response) => {
  const result = dataArray.find((item) => item.id === Number(req.params.id));
  res.json(result);
};

export const create = (req: Request, res: Response) => {
  const result: Character = { ...req.body, id: dataArray.length + 1 };
  dataArray.push(result);
  res.json(result);
};

export const update = (req: Request, res: Response) => {
  const idToUpdate: number = Number(req.params.id);
  let result = dataArray.find(
    (item: Character) => item.id === idToUpdate
  ) as Character;

  if (result) {
    result = { ...result, ...req.body };
    dataArray[
      dataArray.findIndex((item: Character) => item.id === idToUpdate)
    ] = result;
    res.json(result);
  } else {
    res.status(404).json({ error: 'Elemento no encontrado' });
  }
};

export const remove = (req: Request, res: Response) => {
  const idToRemove: number = Number(req.params.id);
  const indexToRemove = dataArray.findIndex(
    (item: Character) => item.id === idToRemove
  );

  if (indexToRemove === -1) {
    dataArray.splice(indexToRemove, 1);
    res.json({});
  } else {
    res.status(404).json({ error: 'Elemento no encontrado' });
  }
};
