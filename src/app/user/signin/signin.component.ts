import { Component } from '@angular/core'; // Import Component decorator for defining the Angular component
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, Validators for form handling
import { Router } from '@angular/router'; // Import Router for navigation
import Swal from 'sweetalert2'; // Import SweetAlert2 for displaying alerts
import { DataService } from '../../service/data.service'; // Import DataService for API communication
import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule for reactive form handling
import { HttpClientModule, HttpHeaders } from '@angular/common/http'; // Import HttpClientModule and HttpHeaders for HTTP requests
import { CookieService } from 'ngx-cookie-service'; // Import CookieService for cookie management
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
// import { DefaultLayoutComponent } from 'src/app/layout'; // Import DefaultLayoutComponent (if used in the template)
import { SignUpComponent } from '../signup/signUp.component'; // Import SignUpComponent for potential use
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component'; // Import ForgetpasswordComponent for navigation
// import { AdminDashboardComponent } from 'src/app/admin/admin-dashboard/admin-dashboard.component';
// import { AdminHomeComponent } from 'src/app/admin/admin-home/admin-home.component';

@Component({
  selector: 'app-sign-in', // Selector for the component
  templateUrl: './signIn.component.html', // Path to the component's HTML template
  styleUrls: ['./signIn.component.css'], // Path to the component's CSS styles
  standalone: true, // Indicates that this component is standalone
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, SignUpComponent, ForgetpasswordComponent], // Import necessary modules and components
  providers: [DataService, CookieService] // Provide DataService and CookieService for dependency injection
})
export class SignInComponent {
  signInForm: FormGroup; // Define a FormGroup instance for the sign-in form
  
  constructor(
    private formBuilder: FormBuilder, // Inject FormBuilder for creating form groups
    private dataService: DataService, // Inject DataService for making API requests
    private router: Router, // Inject Router for navigation
    private cookieService: CookieService, // Inject CookieService for cookie management
    private http: HttpClient  // Inject HttpClient for making HTTP requests
  ) {
    // Initialize the signInForm with form controls and validators
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email is required and must be a valid email address
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-zA-Z]).+$')]], // Password is required, must be at least 6 characters long, and contain letters
      role: ['', [Validators.required]] // Role is required
    });
  }

  get f() {
    return this.signInForm.controls; // Getter for accessing form controls easily in the template
  }

  // Method to navigate to the Sign-Up page
  navigateToSignUp() {
    this.router.navigate(['/']); // Redirect to the home or sign-up page
  }

  // Method to navigate to the Forgot Password page
  navigateToForgotPassword() {
    this.router.navigate(['/forgetPassword']); // Redirect to the forgot password page
  }
  navigateTodashboard(){
    this.router.navigate(['/dashboard']); // Redirect to the forgot password page
 
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.signInForm.invalid) {
      // Check if the form is invalid
      Swal.fire({
        title: 'Invalid Sign-In form!', // Alert title
        text: 'Please correct the errors in the form before submitting.', // Alert text
        icon: 'error', // Alert icon
        confirmButtonText: 'OK' // Text for the confirm button
      });
      return; // Exit if the form is invalid
    }
    
    const formData = this.signInForm.value; // Get form data
    const token = this.cookieService.get('token'); // Retrieve token from cookies

    // Determine API endpoint based on the user role
    const role = formData.role; // Get the role from the form ('user', 'creator', or 'admin')
    const apiEndpoint = role === 'creator' 
      ? '/creator/signin' 
      : role === 'admin' 
        ? '/admin/signin' 
        : '/user/signin'; // Set API endpoint based on the user role

    const apipoint = role === 'creator' 
      ? '/creator' 
      : role === 'admin' 
        ? '/admin' 
        : '/user'; // Set API point for generating token

    console.log(apipoint, apiEndpoint);

    if (token) {
      // If token exists, use it to sign in
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Set authorization header with the token
      });
      this.dataService.post(apiEndpoint, formData, { headers })
        .subscribe({
          next: (response: any) => {
            // On successful response
            localStorage.setItem('user', JSON.stringify(formData)); // Store form data in localStorage
            Swal.fire({
              title: 'Success!', // Alert title
              text: 'You have signed in successfully!', // Alert text
              icon: 'success', // Alert icon
              confirmButtonText: 'OK' // Text for the confirm button
            }).then(() => {
              this.signInForm.reset(); // Reset the form after successful sign-in
              this.router.navigate(['/dashboard']); // Redirect to the dashboard after success
            });
          },
          error: (error) => {
            console.error('Error:', error); // Log the error for debugging
            Swal.fire({
              title: 'Error!', // Alert title
              text: error.error.message || 'Error in Sign-In', // Alert text (show error message from server or a default message)
              icon: 'error', // Alert icon
              confirmButtonText: 'OK' // Text for the confirm button
            });
          }
        });
    } else {
      // If no token exists, request a new one
      this.dataService.post(`${apipoint}/generate-token`, { email: formData.email, password: formData.password }).subscribe({
        next: (response: { token: string }) => {
          const newToken = response.token; // Get the new token from the response

          if (newToken) {
            // Set the new token in cookies
            this.cookieService.set('token', newToken);
            
            // Retry sign-in with the new token
            this.onSubmit();
          } else {
            Swal.fire({
              title: 'Error!', // Alert title
              text: 'Failed to generate token.', // Alert text
              icon: 'error', // Alert icon
              confirmButtonText: 'OK' // Text for the confirm button
            });
          }
        },
        error: (error) => {
          console.error('Error:', error); // Log the error for debugging
          Swal.fire({
            title: 'Error!', // Alert title
            text: 'Error generating token.', // Alert text
            icon: 'error', // Alert icon
            confirmButtonText: 'OK' // Text for the confirm button
          });
        }
      });
    }
  }
}
