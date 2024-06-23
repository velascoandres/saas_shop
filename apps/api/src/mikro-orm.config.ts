import 'dotenv/config'

import { Migrator } from '@mikro-orm/migrations'
import { defineConfig } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { Logger } from '@nestjs/common'

const logger = new Logger('MikroORM')

const config = defineConfig({
  logger: logger.log.bind(logger),
  clientUrl: process.env.POSTGRES_URL,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
})

export default config
