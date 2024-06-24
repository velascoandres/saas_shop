import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Business, BusinessContact } from './entities';

@Module({
  imports: [MikroOrmModule.forFeature([Business, BusinessContact])],
})
export class BusinessModule {}
