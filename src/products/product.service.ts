import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price });
    const product = await newProduct.save();
    return product;
  }

  async getProducts() {
    const products = await this.productModel.find();
    return products;
  }

  async getProductById(productId: string) {
    const product = await this.productModel.findById(productId);
    if(!product) {
      throw new NotFoundException(
        `There is no product with this id: ${productId}`,
      );
    }
    return product;
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    await this.productModel.findByIdAndUpdate(productId, {
      title,
      description,
      price,
    });
    const updatedProduct = await this.productModel.findById(productId);
    if (!updatedProduct) {
      throw new NotFoundException(
        `There is no product with this id: ${productId}`,
      );
    }
    return updatedProduct;
  }

  async deleteProduct(productId: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new NotFoundException(
        `There is no product with this id: ${productId}`,
      );
    }
    return deletedProduct;
  }
}
