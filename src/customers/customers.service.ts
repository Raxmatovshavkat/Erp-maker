import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer) private readonly customerModel: typeof Customer) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<any> {
    const customer = await this.customerModel.create({ ...createCustomerDto });
    return customer
  }

  async findAll() {
    const customer = await this.customerModel.findAll();
    if (!customer) {
      throw new NotFoundException()
    }
    return customer
  }

  async findOne(id: number) {
    const customer=await this.customerModel.findByPk(id);
    if (!customer) {
      throw new NotFoundException()
    }
    return customer

  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer=await this.customerModel.findByPk(id)
    if(!customer){
      throw new NotFoundException()
    }
    customer.update(updateCustomerDto)
    return customer
  }

  async remove(id: number) {
    const customer=await this.customerModel.findByPk(id)
    if(!customer){
      throw new NotFoundException()
    }
    customer.destroy()
  }
}
