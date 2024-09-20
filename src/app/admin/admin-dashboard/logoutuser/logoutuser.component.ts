import { Component, OnInit } from '@angular/core'; // Import Component and OnInit for defining the component and lifecycle hook
import Swal from 'sweetalert2'; // Import Swal for displaying alerts
import { Router } from '@angular/router'; // Import Router for navigation

// Import CookieService for managing cookies
import { CookieService } from 'ngx-cookie-service'; // Example, if using ngx-cookie-service
import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives and pipes

@Component({
  selector: 'app-logoutuser', // Selector for the component
  standalone: true, // Indicates that this component is a standalone component
  imports: [CommonModule], // Import necessary modules
  templateUrl: './logoutuser.component.html', // Path to the component's HTML template
  styleUrls: ['./logoutuser.component.css'] // Path to the component's SCSS styles
})
export class LogoutuserComponent implements OnInit {
  constructor(
    private router: Router, // Inject Router for navigation
    private cookieService: CookieService // Inject CookieService for managing cookies
  ) {}

  ngOnInit() {
    this.showLogoutConfirmation(); // Display the logout confirmation when the component initializes
  }

  showLogoutConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logout Success..',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          localStorage.clear();
          this.cookieService.delete('token');
          this.router.navigate(['/sign-in']);
        });
      }
    })
    .catch((error) => {
      console.error('SweetAlert error: ', error);
    });
  }  
}
