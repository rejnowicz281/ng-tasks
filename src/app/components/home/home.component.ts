import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Product, Products } from '../../../types';
import { ProductsService } from '../../services/products.service';
import { ProductDialogFormComponent } from '../product-form-dialog/product-form-dialog.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    ProductDialogFormComponent,
  ],
  templateUrl: './home.component.html',
  standalone: true,
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  totalProducts: number = 0;
  rows: number = 5;

  ngOnInit() {
    this.getProducts();
  }

  getProducts(page = 0, perPage = this.rows) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {
        page,
        perPage,
      })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalProducts = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editProduct(id: string, product: Product) {
    this.productsService
      .updateProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          this.getProducts();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct('http://localhost:3000/clothes', product)
      .subscribe({
        next: (data) => {
          this.getProducts();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: string) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          this.getProducts();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onPageChange(event: PaginatorState) {
    this.getProducts(event.page, event.rows);
  }

  onProductAdd(product: Product) {
    // console.log(product);
  }
}
