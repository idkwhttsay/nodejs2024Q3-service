import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

config();

const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.NODE_ENV === 'Development',
  autoLoadEntities: true,
};

export default typeormConfig;
