import express, { Request, Response } from 'express';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.get('', (req: Request, res: Response) => { return res.send('Server is running') });
app.use(routes);

export { app };
