import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product, Products } from '../../../types';
import { ProductsService } from '../../services/products.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  ngOnInit() {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page: 0, perPage: 5 })
      .subscribe((products: Products) => {
        this.products = products.items;
      });
  }

  onProductOutput(product: Product) {
    console.log(product);
  }
}
