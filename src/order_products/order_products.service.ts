import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order_product.dto';
import { UpdateOrderProductDto } from './dto/update-order_product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order_product } from './entities/order_product.entity';

@Injectable()
export class OrderProductsService {
  constructor(@InjectModel(Order_product) private readonly order_product_Model:typeof Order_product){}

 async create(createOrderProductDto: CreateOrderProductDto) {
    return await this.order_product_Model.create({...createOrderProductDto});
  }

 async findAll() {
    const order_product=await this.order_product_Model.findAll()
    if (!order_product){
      throw new NotFoundException()
    }
    return order_product
  }

 async findOne(id: number) {
   const order_product =await this.order_product_Model.findByPk(id)
   if (!order_product) {
     throw new NotFoundException()
   }
   return order_product
  }

 async update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
   const order_product =await this.order_product_Model.findByPk(id)
   if (!order_product) {
     throw new NotFoundException()
   }
   return order_product.update(updateOrderProductDto)
  }

async  remove(id: number) {
  const order_product =await this.order_product_Model.findByPk(id)
  if (!order_product) {
    throw new NotFoundException()
  }
  return order_product.destroy()
}
}
