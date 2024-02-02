import express, { Application } from 'express';
import middleware from './middleware';
import routes from './routes';
import { errorHandler, notFoundHandler } from './errors';
import path from 'path';
const app: Application = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.json());
app.use(middleware);
app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
