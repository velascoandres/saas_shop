import { MikroOrmModule } from '@mikro-orm/nestjs'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './features/auth/auth.module'
import { UsersModule } from './features/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
  providers: [AppService],
  controllers: [],
  exports: [],
})
export class AppModule {}
