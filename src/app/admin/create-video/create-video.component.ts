import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-create-video',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css'],
  providers: [DataService]
})
export class CreateVideoComponent {
  uploadForm: FormGroup;
    categories: string[] = ['Movies', 'Music', 'Sports', 'Education', 'Gaming', 'News', 'Documentary', 'Comedy']; // Predefined categories
    apiEndpoint: string = '/videoRoute/createvideo'; // Set API endpoint

  constructor(private fb: FormBuilder, private dataService: DataService) {
    // Initialize the form group with validation
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryName: ['', Validators.required], // Added categoryName field
      video: [null, Validators.required],
      thumbnail: [null, Validators.required]
    });
  }

  // Handle file input changes for video and thumbnail
  onFileChange(event: any, type: 'video' | 'thumbnail') {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        [type]: file
      });
    }
  }
  
  // Handle form submission
  onSubmit() {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('title', this.uploadForm.get('title')?.value);
      formData.append('description', this.uploadForm.get('description')?.value);
      formData.append('categoryName', this.uploadForm.get('categoryName')?.value); // Append categoryName
      formData.append('resolution', this.uploadForm.get('resolution')?.value); // If you have a resolution field in the form
      formData.append('duration', this.uploadForm.get('duration')?.value); // If you have a duration field in the form
  
      // Append video and thumbnail files
      const videoFile = this.uploadForm.get('video')?.value;
      const thumbnailFile = this.uploadForm.get('thumbnail')?.value;
  
      if (videoFile) {
        formData.append('video', videoFile); // Ensure you're appending the actual file object
      }
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile); // Ensure you're appending the actual file object
      }
  
      // Call the DataService to handle the upload
      this.dataService.post(this.apiEndpoint, formData).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Create Video Successful!',
            showConfirmButton: false,
            timer: 1500
          });
          // Optionally, navigate to another page or reset the form here
          this.uploadForm.reset(); // Reset the form after successful submission
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: error.message || 'There was an error uploading your video. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill out all fields and select both video and thumbnail.',
        confirmButtonText: 'OK'
      });
    }
  }
}
