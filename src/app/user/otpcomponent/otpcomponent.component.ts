import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives and pipes
import { Component, OnInit } from '@angular/core'; // Import Component and OnInit for defining the component and lifecycle hook
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, and Validators for form handling
import { DataService } from '../../service/data.service'; // Import DataService for API interactions
import Swal from 'sweetalert2'; // Import Swal for displaying alerts
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP requests
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-otpcomponent', // Selector for the component
  standalone: true, // Indicates that this component is a standalone component
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Import necessary modules
  templateUrl: './otpcomponent.component.html', // Path to the component's HTML template
  styleUrls: ['./otpcomponent.component.css'], // Path to the component's CSS styles
  providers: [DataService] // Provide the DataService within this component
})
export class OtpcomponentComponent implements OnInit {
  otpForm!: FormGroup; // FormGroup instance for managing the OTP form
  apiEndpoint: string = ''; // To store the API endpoint for OTP verification

  constructor(
    private fb: FormBuilder, // Inject FormBuilder for creating the form
    private dataService: DataService, // Inject DataService for making API calls
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    // Initialize the OTP form with validation
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]] // Validate OTP as a 4-digit number
    });

    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user'); // Get user data from localStorage
    const user = userData ? JSON.parse(userData) : null; // Parse user data if it exists
    const role = user?.role; // Extract role from user data
    console.log(role);

    // Determine the API endpoint based on user role
    this.apiEndpoint = role === 'creator'
      ? '/creator/verifyOTP'
      : role === 'admin'
      ? '/admin/verifyOTP'
      : '/user/verifyOTP';
  }

  onSubmit(): void {
    if (this.otpForm.valid) { // Check if the OTP form is valid
      const otp = this.otpForm.get('otp')?.value; // Get the OTP value

      console.log(otp);
      console.log(this.apiEndpoint);

      // Prepare the request body with the OTP
      const requestBody = { otp: otp };

      // Call the API to verify the OTP
      this.dataService.post(this.apiEndpoint, requestBody).subscribe({
        next: (response: any) => {
          // Handle successful OTP verification
          Swal.fire({
            title: 'Success!',
            text: 'OTP verified successfully!',
            icon: 'success',
            confirmButtonText: 'Continue',
            confirmButtonColor: '#4CAF50', // Green color for success
            background: '#f0f8ff', // Light background color
            color: '#333', // Text color
          });
          this.router.navigate(['/resetPassword']); // Navigate to reset password page after success
          console.log('OTP verified:', response);
        },
        error: (error) => {
          // Handle error in OTP verification
          Swal.fire({
            title: 'Error!',
            text: 'OTP verification failed!',
            icon: 'error',
            confirmButtonText: 'Retry',
            confirmButtonColor: '#d33', // Red color for error
            background: '#ffe6e6', // Light red background for error
            color: '#333', // Text color
          });
          console.error('Error verifying OTP:', error);
        }
      });
    }      
  }  
}
