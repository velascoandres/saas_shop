import { AuthModule } from '@/auth/auth.module';
import { BusinessAdminController } from '@/business/controllers/business-admin.controller';
import { BusinessController } from '@/business/controllers/business.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Business, BusinessContact } from './entities';
import { BusinessContactService } from './services/business-contact.service';
import { BusinessService } from './services/business.service';

@Module({
  imports: [
    AuthModule,
    MikroOrmModule.forFeature({ entities: [Business, BusinessContact] }),
  ],
  providers: [BusinessService, BusinessContactService],
  controllers: [BusinessController, BusinessAdminController],
})
export class BusinessModule {}
