import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private readonly orderModel:typeof Order){}

 async create(createOrderDto: CreateOrderDto) {
    return await this.orderModel.create({...createOrderDto});
  }

  async findAll() {
   const order=await this.orderModel.findAll()
   if (!order){
    throw new NotFoundException()
   }
   return order
  }

  async findOne(id: number) {
    const order = await this.orderModel.findByPk(id)
    if (!order) {
      throw new NotFoundException()
    }
    return order
  }

 async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findByPk(id)
    if (!order) {
      throw new NotFoundException()
    }
    return order.update(updateOrderDto)
  }

async  remove(id: number) {
  const order = await this.orderModel.findByPk(id)
  if (!order) {
    throw new NotFoundException()
  }
  return order.destroy()
}
}
