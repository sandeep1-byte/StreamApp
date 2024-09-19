import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css'
})
export class ProductCrudComponent {
  productList: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch all products
  fetchProducts(): void {
    this.http
      .get<any>('https://dummyjson.com/products')
      .pipe(
        map((response) => response.products),
        catchError((err) => {
          console.error('Error fetching data:', err);
          this.error = 'Error fetching data. Check the console for details.';
          return of([]);
        })
      )
      .subscribe((products) => {
        this.productList = products;
      });
  }

  // Add a new product
  addProduct(newProduct: any): void {
    this.http
      .post<any>('https://dummyjson.com/products/add', newProduct)
      .pipe(
        catchError((err) => {
          console.error('Error adding product:', err);
          this.error = 'Error adding product.';
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.productList.push(response); // Update the local list with the new product
        }
      });
  }

  // Update an existing product
  updateProduct(productId: number, updatedProduct: any): void {
    this.http
      .put<any>(`https://dummyjson.com/products/${productId}`, updatedProduct)
      .pipe(
        catchError((err) => {
          console.error('Error updating product:', err);
          this.error = 'Error updating product.';
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          const index = this.productList.findIndex((product) => product.id === productId);
          if (index !== -1) {
            this.productList[index] = response; // Update the product in the local list
          }
        }
      });
  }

  // Delete a product
  deleteProduct(productId: number): void {
    this.http
      .delete<any>(`https://dummyjson.com/products/${productId}`)
      .pipe(
        catchError((err) => {
          console.error('Error deleting product:', err);
          this.error = 'Error deleting product.';
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.productList = this.productList.filter((product) => product.id !== productId); // Remove product from local list
        }
      });
  }

  // Example function for navigation (optional)
  viewMore(product: any): void {
    this.router.navigate(['/products', product.id]);
  }
}
