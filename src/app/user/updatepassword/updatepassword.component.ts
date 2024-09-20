import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives
import { Component, OnInit } from '@angular/core'; // Import Component and OnInit from Angular core
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormBuilder, FormGroup, Validators for form handling
import { Router } from '@angular/router'; // Import Router for navigation
import Swal from 'sweetalert2'; // Import SweetAlert2 for displaying alerts
import { DataService } from '../../../service/data.service'; // Import DataService for API communication
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP requests

@Component({
  selector: 'app-updatepassword', // Selector for the component
  standalone: true, // Indicates that this component is standalone
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Import necessary modules
  providers: [DataService], // Provide DataService for dependency injection
  templateUrl: './updatepassword.component.html', // Path to the component's HTML template
  styleUrls: ['./updatepassword.component.css'] // Path to the component's CSS styles
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm!: FormGroup; // Define a FormGroup instance for the update password form
  user: any; // Define a variable to store user data

  constructor(
    private fb: FormBuilder, // Inject FormBuilder for creating form groups
    private router: Router, // Inject Router for navigation
    private dataService: DataService // Inject DataService for making API requests
  ) {}

  ngOnInit(): void {
    // Retrieve user data from localStorage and parse it
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;

    // Initialize the updatePasswordForm with form controls and validators
    this.updatePasswordForm = this.fb.group({
      password: ['', Validators.required], // Current password is required
      newPassword: ['', [
        Validators.required, // New password is required
        Validators.minLength(6), // New password must be at least 6 characters long
        Validators.pattern(/(?=.*[a-zA-Z])(?=.*\d).+/) // New password must contain letters and digits
      ]],
      confirmPassword: ['', Validators.required] // Confirm password is required
    }, { validator: this.passwordMatchValidator }); // Apply custom validator to check if new password and confirm password match
  }

  // Custom validator to check if new password and confirm password fields match
  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true }; // Return error object if passwords do not match
  }

  get f() {
    return this.updatePasswordForm.controls; // Getter for accessing form controls easily in the template
  }

  // onSubmit function to handle form submission
  onSubmit(): void {
    if (this.updatePasswordForm.invalid) {
      // Check if the form is invalid
      Swal.fire({
        title: 'Invalid form!', // Alert title
        text: 'Please correct the errors before submitting.', // Alert text
        icon: 'error', // Alert icon
        confirmButtonText: 'OK' // Text for the confirm button
      });
      return; // Exit if the form is invalid
    }

    // Determine API endpoint based on the user role
    const rolepoint = this.user?.role; // Get the role of the user
    console.log(rolepoint);
    
    const apiEndpoint = rolepoint === 'creator' 
      ? '/creator/update-password' 
      : rolepoint === 'admin' 
        ? '/admin/update-password' 
        : '/user/update-password'; // Set API endpoint based on the user role

    const formData = {
      ...this.updatePasswordForm.value, // Spread form values into formData
      email: this.user.email // Add the email to formData
    };

    // Log API call details for debugging
    console.log(`Calling API: ${apiEndpoint}`);
    console.log(`Form Data:`, formData);
    
    // Call the API to update the password
    this.dataService.put(apiEndpoint, formData).subscribe({
      next: (response: any) => {
        console.log('API Response:', response); // Log the API response
        Swal.fire({
          title: 'Success!', // Alert title
          text: 'Your password has been updated successfully!', // Alert text
          icon: 'success', // Alert icon
          confirmButtonText: 'OK' // Text for the confirm button
        }).then(() => {
          this.updatePasswordForm.reset(); // Reset the form after successful update
          this.router.navigate(['/dashboard']); // Redirect to the dashboard after success
        });
      },
      error: (error) => {
        console.error('Error:', error); // Log the error for debugging
        Swal.fire({
          title: 'Error!', // Alert title
          text: error.error?.message || 'Error updating password', // Alert text (show error message from server or a default message)
          icon: 'error', // Alert icon
          confirmButtonText: 'OK' // Text for the confirm button
        });
      }
    });
  }
}
