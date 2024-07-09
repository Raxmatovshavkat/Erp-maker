import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { Order_product } from '../order_products/entities/order_product.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [SequelizeModule.forFeature([Order, Order_product])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule { }
