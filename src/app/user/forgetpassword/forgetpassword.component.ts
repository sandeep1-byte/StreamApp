import { Component, OnInit } from '@angular/core'; // Import Component and OnInit for defining the component and lifecycle hook
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, and Validators for form handling
import { Router } from '@angular/router'; // Import Router for navigation
import Swal from 'sweetalert2'; // Import Swal for displaying alerts
import { DataService } from '../../service/data.service'; // Import DataService for making API calls
import { CookieService } from 'ngx-cookie-service'; // Import CookieService for managing cookies (though not used here)
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient and HttpClientModule for HTTP requests (HttpClientModule not used in constructor)
import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives and pipes
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule for reactive forms
// import { BsModalRef } from 'ngx-bootstrap/modal'; // Import BsModalRef for managing modal references

@Component({
  selector: 'app-forgetpassword', // Selector for the component
  standalone: true, // Indicates that this component is a standalone component
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule], // Import necessary modules
  templateUrl: './forgetpassword.component.html', // Path to the component's HTML template
  styleUrls: ['./forgetpassword.component.css'], // Path to the component's CSS styles
  providers: [DataService], // Provide the DataService for dependency injection
})
export class ForgetpasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup; // Form group for the forgot password form
  user: any; // Variable to store user data
  rolepoint: string = ''; // Variable to store the role
  apiEndpoint: string = ''; // Variable to store the API endpoint

  constructor(
    private fb: FormBuilder, // Inject FormBuilder for creating form groups
    private router: Router, // Inject Router for navigation
    private dataService: DataService, // Inject DataService for making API calls
    private http: HttpClient // Inject HttpClient for making HTTP requests (HttpClientModule not needed in constructor)
  ) {}

  ngOnInit(): void {
    // Retrieve user data from localStorage and determine the API endpoint based on role
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
    this.rolepoint = this.user?.role;

    // Determine API endpoint based on role
    this.apiEndpoint = this.rolepoint === 'creator'
      ? '/creator/forgotpassword'
      : this.rolepoint === 'admin'
      ? '/admin/forgotpassword'
      : '/user/forgotpassword';

    // Initialize the forgot password form with email field
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Email field with required and email validators
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      console.log(email);
      console.log(this.apiEndpoint);

      // Call the API to send OTP
      this.dataService.post(this.apiEndpoint, { email })
        .subscribe({
          next: (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'OTP sent successfully!',
            }).then(() => {
              this.router.navigate(['/verifyOTP']); // Navigate to the OTP verification page
              // this.modalRef.hide(); // Close the modal after submission
            });
          },
          error: (error) => {
            console.error('Error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'Failed to send OTP. Please try again.',
            });
          }
        });
    }
  }

  // onClose(): void {
  //   this.modalRef.hide(); // Close the modal without any action
  // }
}
