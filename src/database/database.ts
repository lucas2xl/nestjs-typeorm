import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'docker',
  database: process.env.DB_NAME || 'postgres',
  autoLoadEntities: true,
  synchronize: true,
};
