import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const DEFAULT_PORT = 8000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());

	const configService = app.get(ConfigService);

	await app.listen(configService.get('PORT') || DEFAULT_PORT);
}
bootstrap();
