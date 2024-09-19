import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  productList: any[] = [];
  error: string | null = null;
  constructor(private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }
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
}
