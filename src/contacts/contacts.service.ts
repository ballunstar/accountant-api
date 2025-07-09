import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact, ContactStatus } from '../entities/contact.entity';
import { CreateContactDto } from '../dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);
    return this.contactRepository.save(contact);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    status?: ContactStatus,
  ): Promise<{ data: Contact[]; total: number; page: number; totalPages: number }> {
    const queryBuilder = this.contactRepository.createQueryBuilder('contact');

    if (status) {
      queryBuilder.where('contact.status = :status', { status });
    }

    queryBuilder
      .orderBy('contact.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async updateStatus(
    id: number,
    status: ContactStatus,
    adminNotes?: string,
  ): Promise<Contact> {
    const contact = await this.findOne(id);
    contact.status = status;
    if (adminNotes) {
      contact.adminNotes = adminNotes;
    }
    return this.contactRepository.save(contact);
  }
}
