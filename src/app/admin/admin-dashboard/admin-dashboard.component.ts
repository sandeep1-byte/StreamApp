import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  productList: any[] = [];
  error: string | null = null;
  user_dashboard_data: any;
  total_user: number = 0;
  admin_user: number = 0;
  seller_user: number = 0;
  buyer_user: number = 0;

  product_dashboard_data: any;
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;

  constructor(private router: Router,private http:HttpClient, private adminService: AdminService) { }

  ngOnInit(): void {

  }
  userDashboard() {
    this.router.navigateByUrl("/dashboard/updatepassword");
  }
  productDashboard() {
    this.router.navigateByUrl("/dashboard/Logout")
  }
  uploadvideo(){
    this.router.navigateByUrl("/dashboard/uploadvideo")
  }
  Videolist(){
    this.router.navigateByUrl("/dashboard/videoslist")
  }
}
