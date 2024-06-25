import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { SetupBusinessDto, UpdateBusinessDto } from '@repo/validation-schemas';
import { Business, BusinessContact } from '../entities';

@Injectable()
export class BusinessService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Business)
    private readonly businessRepository: EntityRepository<Business>,
    @InjectRepository(BusinessContact)
    private readonly businessContactRepository: EntityRepository<BusinessContact>,
  ) {}

  async updateBusiness(
    businessId: string,
    updateBusinessDto: UpdateBusinessDto,
  ) {
    const business = await this.businessRepository.findOneOrFail({
      id: businessId,
    });

    wrap(business).assign({
      ...updateBusinessDto,
    });

    await this.em.flush();

    return business;
  }

  async setupBusiness(ownerId: string, setupBusinessDto: SetupBusinessDto) {
    return this.em.transactional(async (entityManager) => {
      const business = await this.businessRepository.create({
        ...setupBusinessDto.business,
        owner: ownerId,
      });

      await entityManager.persistAndFlush(business);

      const contactsOperations = setupBusinessDto.contacts.map(
        async (contact) => {
          const newContact = await this.businessContactRepository.create({
            ...contact,
            business,
          });

          entityManager.persistAndFlush(newContact);

          return newContact;
        },
      );

      await Promise.all(contactsOperations);

      return true;
    });
  }
}
