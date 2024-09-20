import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives and pipes
import { Component, OnInit } from '@angular/core'; // Import Component and OnInit for defining the component and lifecycle hook
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, and Validators for form handling
import { DataService } from '../../service/data.service'; // Import DataService for API interactions
import Swal from 'sweetalert2'; // Import Swal for displaying alerts
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP requests
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-reset-password', // Selector for the component
  standalone: true, // Indicates that this component is a standalone component
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Import necessary modules
  templateUrl: './reset-password.component.html', // Path to the component's HTML template
  styleUrls: ['./reset-password.component.css'], // Path to the component's CSS styles
  providers: [DataService] // Provide the DataService within this component
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup; // FormGroup instance for managing the form
  apiEndpoint: string = ''; // To store the API endpoint based on user role
  passwordsDoNotMatch: boolean = false; // Flag to indicate if passwords match
  email: string = ''; // To store the email from localStorage

  constructor(
    private fb: FormBuilder, // Inject FormBuilder for creating the form
    private dataService: DataService, // Inject DataService for making API calls
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    // Initialize the form with password and confirmPassword fields
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validation
      confirmPassword: ['', [Validators.required]] // Confirm password field with validation
    });

    // Retrieve user data from localStorage
    const userData = localStorage.getItem('user'); // Get user data from localStorage
    const user = userData ? JSON.parse(userData) : null; // Parse user data if it exists
    this.email = user?.email; // Extract email from user data
    const role = user?.role; // Extract role from user data

    // Determine the API endpoint based on user role
    this.apiEndpoint = role === 'creator'
      ? '/creator/setnewpassword'
      : role === 'admin'
      ? '/admin/setnewpassword'
      : '/user/setnewpassword';
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) { // Check if the form is valid
      const password = this.resetPasswordForm.get('password')?.value; // Get the new password value
      const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value; // Get the confirm password value

      // Check if the new password and confirm password fields match
      if (password === confirmPassword) {
        this.passwordsDoNotMatch = false; // Reset the flag

        // Prepare the request body with new password and email
        const requestBody = {
          password: password,
          email: this.email // Include email in request body
        };

        // Call the API to reset the password
        this.dataService.put(this.apiEndpoint, requestBody).subscribe({
          next: (response: any) => {
            // Handle successful password reset
            Swal.fire({
              title: 'Success!',
              text: 'Password reset successfully!',
              icon: 'success',
              confirmButtonText: 'Continue',
              confirmButtonColor: '#4CAF50', // Green color for success
              background: '#f0f8ff', // Light background color
              color: '#333', // Text color
            });
            this.router.navigate(['/sign-in']); // Navigate to sign-in page after success
            console.log('Password reset:', response);
          },
          error: (error) => {
            // Handle error in password reset
            Swal.fire({
              title: 'Error!',
              text: 'Password reset failed! Please try again.',
              icon: 'error',
              confirmButtonText: 'Retry',
              confirmButtonColor: '#d33', // Red color for error
              background: '#ffe6e6', // Light red background for error
              color: '#333', // Text color
            });
            console.error('Error resetting password:', error);
          }
        });
      } else {
        // If passwords do not match, show a warning
        this.passwordsDoNotMatch = true; // Set the flag
        Swal.fire({
          title: 'Warning!',
          text: 'Passwords do not match. Please try again.',
          icon: 'warning',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#ff9800' // Orange color for warning
        });
      }
    }
  }
}
