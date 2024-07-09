import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private readonly productModel: typeof Product) { }

  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.create({ ...createProductDto })
    return product
  }

  async findAll() {
    const product = await this.productModel.findAll()
    if (!product) {
      throw new NotFoundException()
    }
    return product
  }

  async findOne(id: number) {
    const product = await this.productModel.findByPk(id)
    if (!product) {
      throw new NotFoundException()
    }
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findByPk(id)
    if (!product) {
      throw new NotFoundException()
    };
    return product.update(updateProductDto)
  }

  async remove(id: number) {
    const product = await this.productModel.findByPk(id)
    if (!product) {
      throw new NotFoundException()
    }
    return product.destroy()
  }
}
