import { ROLES } from '@/auth/constants';
import { AccountVerified } from '@/auth/decorators/account-verified';
import { Roles } from '@/auth/decorators/roles';
import { User } from '@/auth/decorators/user';
import { AuthUser } from '@/auth/types';
import { BusinessContactService } from '@/business/services/business-contact.service';
import { BusinessService } from '@/business/services/business.service';
import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe';
import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import {
  CreateContactDto,
  SetupBusinessDto,
  UpdateBusinessDto,
  UpdateContactDto,
  createContactSchema,
  setupBusinessSchema,
  updateBusinessSchema,
  updateContactSchema,
} from '@repo/validation-schemas';

@Controller('admin/business')
export class BusinessAdminController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly businessContactService: BusinessContactService,
  ) {}

  @Post('setup')
  @AccountVerified()
  @UsePipes(new ZodValidationPipe(setupBusinessSchema))
  setupBusiness(
    @User() user: AuthUser,
    @Body() setupBusinessDto: SetupBusinessDto,
  ) {
    return this.businessService.setupBusiness(user.id, setupBusinessDto);
  }

  @Put()
  @Roles(ROLES.SHOP_OWNER)
  @UsePipes(new ZodValidationPipe(updateBusinessSchema))
  async updateBusiness(
    @User() user: AuthUser,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    const business = await this.businessService.getBusinessByUserId(user.id);

    return this.businessService.updateBusiness(business.id, updateBusinessDto);
  }

  @Post('contact')
  @Roles(ROLES.SHOP_OWNER)
  @UsePipes(new ZodValidationPipe(createContactSchema))
  async createContact(
    @User() user: AuthUser,
    @Body() createContactDto: CreateContactDto,
  ) {
    const business = await this.businessService.getBusinessByUserId(user.id);

    return this.businessContactService.createContact(
      business.id,
      createContactDto,
    );
  }

  @Put('contact/:contactId')
  @Roles(ROLES.SHOP_OWNER)
  @UsePipes(new ZodValidationPipe(updateContactSchema))
  async updateContact(
    @User() user: AuthUser,
    @Body() updateContactDto: UpdateContactDto,
    @Param('contactId', ParseIntPipe) contactId: number,
  ) {
    const business = await this.businessService.getBusinessByUserId(user.id);

    return this.businessContactService.updateBusinessContact(
      contactId,
      business.id,
      updateContactDto,
    );
  }
}
