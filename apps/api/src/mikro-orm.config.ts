import 'dotenv/config'

import { defineConfig } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';

const logger = new Logger('MikroORM');

const config = defineConfig({
  logger: logger.log.bind(logger),
	clientUrl: process.env.POSTGRES_URL,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
})


console.log(process.env.POSTGRES_URL)

export default config;
