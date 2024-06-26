import { User } from '@/auth/decorators/user';
import { AuthUser } from '@/auth/types';
import { BusinessContactService } from '@/business/services/business-contact.service';
import { BusinessService } from '@/business/services/business.service';
import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';

@Controller('business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly businessContactService: BusinessContactService,
  ) {}

  @Get('id')
  getUserBusiness(@User() user: AuthUser) {
    return this.businessService.getBusinessById(user.id);
  }

  @Get('business/:id/contact')
  async getContacts(@Param('id', ParseUUIDPipe) id: string) {
    return this.businessContactService.findAllBusinessContacts(id);
  }
}
