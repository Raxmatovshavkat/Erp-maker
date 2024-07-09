import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order_product } from './entities/order_product.entity';
import { OrderProductsService } from './order_products.service';
import { OrderProductsController } from './order_products.controller';

@Module({
  imports: [SequelizeModule.forFeature([Order_product])],
  providers: [OrderProductsService],
  controllers: [OrderProductsController],
})
export class OrderProductsModule { }
