import { AuthModule } from '@/auth/auth.module'
import { BusinessModule } from '@/business/business.module'
import { UsersModule } from '@/users/users.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(),
    UsersModule,
    BusinessModule,
    AuthModule,
  ],
  providers: [AppService],
  controllers: [],
  exports: [],
})
export class AppModule {}
