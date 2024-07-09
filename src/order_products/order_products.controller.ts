import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderProductsService } from './order_products.service';
import { CreateOrderProductDto } from './dto/create-order_product.dto';
import { UpdateOrderProductDto } from './dto/update-order_product.dto';

@Controller('order-products')
export class OrderProductsController {
  constructor(private readonly orderProductsService: OrderProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createOrderProductDto: CreateOrderProductDto) {
    return this.orderProductsService.create(createOrderProductDto);
  }

  @Get()
  findAll() {
    return this.orderProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderProductsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderProductDto: UpdateOrderProductDto) {
    return this.orderProductsService.update(+id, updateOrderProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderProductsService.remove(+id);
  }
}
