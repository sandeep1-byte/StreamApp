import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  standalone: true, // Make sure it's a standalone component
  imports: [CommonModule], // Include CommonModule here
  providers: [DataService]
})
export class VideoListComponent implements OnInit {
  videos: any[] = []; // Array to hold video objects
  apiEndpoint: string = '/videoRoute/allvideos'; // Set the API endpoint for getting videos
  deleteEndpoint: string = '/videoRoute/deletevideos'; // Set the API endpoint for deleting videos

  constructor(private dataService: DataService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getAllVideos(); // Fetch videos when the component initializes
  }
  updateVideo(){
    this.router.navigateByUrl("/UpdateVideo");
  }
  getAllVideos() {
    this.dataService.get(this.apiEndpoint).subscribe(
      (response: any) => {
        console.log("dhfdf");
        
        console.log(response);
        this.videos = response; // Assuming response is the array of video objects
        console.log(this.videos);
      },
      error => {
        console.error('Error fetching videos', error);
      }
    );
  }

  deleteVideo(videoId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to Delete!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.delete(`${this.deleteEndpoint}/${videoId}`).subscribe(
          () => {
            Swal.fire('Deleted!', 'Your video has been deleted.', 'success');
            this.getAllVideos(); // Refresh the video list
          },
          error => {
            Swal.fire('Error!', 'There was a problem deleting the video.', 'error');
          }
        );
      }
    });
  }
}
