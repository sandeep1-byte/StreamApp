import { Component } from '@angular/core';

@Component({
  selector: 'app-update-video',
  standalone: true,
  imports: [],
  templateUrl: './update-video.component.html',
  styleUrl: './update-video.component.css'
})
export class UpdateVideoComponent {
  // uploadForm: FormGroup;
  // categories: string[] = ['Category1', 'Category2']; // Replace with actual categories
  // videoId: string; // Video ID to be updated

  // constructor(private fb: FormBuilder, private dataService: DataService) {
  //   this.uploadForm = this.fb.group({
  //     title: ['', Validators.required],
  //     description: ['', Validators.required],
  //     categoryName: ['', Validators.required],
  //     video: [null],
  //     thumbnail: [null]
  //   });
  // }

  // ngOnInit(): void {
  //   // Load video data to populate form (fetch using videoId)
  //   this.loadVideoData();
  // }

  // loadVideoData() {
  //   this.dataService.get(`your-api-endpoint/${this.videoId}`).subscribe(video => {
  //     this.uploadForm.patchValue(video);
  //   });
  // }

  // onFileChange(event: any, field: string) {
  //   const file = event.target.files[0];
  //   this.uploadForm.patchValue({ [field]: file });
  // }

  // onSubmit() {
  //   if (this.uploadForm.valid) {
  //     const formData = new FormData();
  //     formData.append('title', this.uploadForm.get('title')?.value);
  //     formData.append('description', this.uploadForm.get('description')?.value);
  //     formData.append('categoryName', this.uploadForm.get('categoryName')?.value);
  //     if (this.uploadForm.get('video')?.value) {
  //       formData.append('video', this.uploadForm.get('video')?.value);
  //     }
  //     if (this.uploadForm.get('thumbnail')?.value) {
  //       formData.append('thumbnail', this.uploadForm.get('thumbnail')?.value);
  //     }

  //     this.dataService.put(`your-api-endpoint/${this.videoId}`, formData).subscribe(
  //       () => {
  //         Swal.fire('Updated!', 'Your video has been updated.', 'success');
  //       },
  //       error => {
  //         Swal.fire('Error!', 'There was a problem updating the video.', 'error');
  //       }
  //     );
  //   }
  // }
}
