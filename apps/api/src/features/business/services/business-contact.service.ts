import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateContactDto, UpdateContactDto } from '@repo/validation-schemas';
import { BusinessContact } from '../entities';

@Injectable()
export class BusinessContactService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(BusinessContact)
    private readonly businessContactRepository: EntityRepository<BusinessContact>,
  ) {}

  async createContact(
    businessId: string,
    createContactDto: CreateContactDto,
  ): Promise<BusinessContact> {
    const contact = this.businessContactRepository.create({
      ...createContactDto,
      business: businessId,
    });

    await this.em.persistAndFlush(contact);

    return contact;
  }

  async updateBusinessContact(
    contactId: number,
    businessId: string,
    updateContactDto: UpdateContactDto,
  ): Promise<BusinessContact> {
    const contact = await this.businessContactRepository.findOneOrFail({
      id: contactId,
    });

    const isRelatedToContact = contact.business.id === businessId;

    if (!isRelatedToContact) {
      throw new UnauthorizedException('Contact not related to business');
    }

    wrap(contact).assign({
      ...updateContactDto,
    });

    await this.em.flush();

    return contact;
  }

  findAllBusinessContacts(businessId: string) {
    return this.businessContactRepository.findAll({
      where: {
        business: businessId,
      },
    });
  }
}
