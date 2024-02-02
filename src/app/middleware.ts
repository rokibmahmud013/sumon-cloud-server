import express, { urlencoded } from 'express';
import path from 'path';

import morgan from 'morgan';
import cors from 'cors';

const middleware = [
  morgan('dev'),
  cors({
    origin: '*',
  }),
  express.json(),
  express.static(path.join(__dirname, 'public')),
  urlencoded({ extended: true }),
];
export default middleware;
