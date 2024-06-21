import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MikroOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(configService: ConfigService) {
				return {
					entities: ['./dist/**/*.entity.js'],
					entitiesTs: ['./src/**/*.entity.ts'],
					clientUrl: configService.get('POSTGRES_URL'),
					driver: PostgreSqlDriver,
					debug: true,
				};
			},
		}),
    UsersModule,
    AuthModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
