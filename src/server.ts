import 'reflect-metadata';
import { config } from 'dotenv';
import { app } from './app';
import { AppDataSource } from './database/data-source';

config();
const port = process.env.PORT || 3333;

AppDataSource.initialize().then(() => {
  app.listen(port, () => console.log(`Server is running in port:${port}`));
});
