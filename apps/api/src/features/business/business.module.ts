import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Business, BusinessContact } from './entities';
import { BusinessContactService } from './services/business-contact.service';
import { BusinessService } from './services/business.service';

@Module({
  imports: [MikroOrmModule.forFeature([Business, BusinessContact])],
  providers: [BusinessService, BusinessContactService],
})
export class BusinessModule {}
