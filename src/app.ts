import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { charactersRouter } from './router/characters.router.js';

export const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));
app.use('/', charactersRouter);
app.use((_req, _res, next) => {
  console.log('Hola muundo!!');
  next();
});

app.use('/characters', charactersRouter);
