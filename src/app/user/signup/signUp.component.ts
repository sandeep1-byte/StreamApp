import { Component } from '@angular/core'; // Import Component decorator from Angular core
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, and Validators for handling forms
import { Router } from '@angular/router'; // Import Router for navigation
import Swal from 'sweetalert2'; // Import SweetAlert2 for showing alerts
import { DataService } from '../../service/data.service'; // Import DataService for making API requests
import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule for reactive form handling
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP communication
import { SignInComponent } from '../signin/signin.component'; // Import SignInComponent for navigation

@Component({
  selector: 'app-sign-up', // Selector for the component
  templateUrl: './signUp.component.html', // Path to the component's HTML template
  styleUrls: ['./signUp.component.css'], // Path to the component's CSS styles
  standalone: true, // Indicates that this component is standalone
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, SignInComponent], // Import necessary modules and components
  providers: [DataService] // Provide DataService for dependency injection
})
export class SignUpComponent {
  signUpForm: FormGroup; // Define a FormGroup instance for handling the signup form

  constructor(
    private formBuilder: FormBuilder, // Inject FormBuilder for creating form groups
    private dataService: DataService, // Inject DataService for making API requests
    private router: Router // Inject Router for navigation
  ) {
    // Initialize the signUpForm with form controls and validators
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]], // Username is required and must be alphabetic
      email: ['', [Validators.required, Validators.email]], // Email is required and must be a valid email format
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-zA-Z]).+$')]], // Password is required, must be at least 6 characters long, and contain letters
      role: ['', [Validators.required]] // Role is required
    });
  }

  navigateToSignIn() {
    this.router.navigate(['/sign-in']); // Navigate to the sign-in page
  }

  get f() {
    return this.signUpForm.controls; // Getter for accessing form controls easily in the template
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      // Check if the form is invalid
      Swal.fire({
        title: 'Invalid signup form!', // Alert title
        text: 'Please correct the errors in the form before submitting.', // Alert text
        icon: 'error', // Alert icon
        confirmButtonText: 'OK' // Text for the confirm button
      });
      return; // Exit if the form is invalid
    }

    const formData = this.signUpForm.value; // Get the form data
    const role = formData.role;  // Get the role from the form ('user' or 'creator')

    // Dynamically set the API endpoint based on role
    const apiEndpoint = role === 'creator' ? '/creator/signup' : '/user/signup';

    // Make the API request to the signup endpoint
    this.dataService.post(apiEndpoint, formData).subscribe({
      next: (response: any) => {
        console.log(response); // Log the response for debugging
        localStorage.setItem('user', JSON.stringify(formData)); // Store the form data in localStorage
        Swal.fire({
          title: 'Success!', // Alert title
          text: 'Your account has been created successfully!', // Alert text
          icon: 'success', // Alert icon
          confirmButtonText: 'OK' // Text for the confirm button
        }).then(() => {
          this.signUpForm.reset(); // Reset the form after successful signup
          this.router.navigate(['/sign-in']); // Navigate to the sign-in page
        });
      },
      error: (error) => {
        console.error('Error:', error); // Log the error for debugging
        Swal.fire({
          title: 'Error!', // Alert title
          text: error.error.message || 'Error in SignUp', // Alert text (show error message from server or a default message)
          icon: 'error', // Alert icon
          confirmButtonText: 'OK' // Text for the confirm button
        });
      }
    });
  }
}
