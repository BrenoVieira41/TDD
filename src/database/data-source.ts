import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  schema: process.env.DB_SCHEMA,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
});

export const TestDataSource = new DataSource({
  type: 'sqlite',
  database: './tests/Database.sqlite',
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
})
