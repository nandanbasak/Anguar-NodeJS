import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images: any[] = [];
  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.imageService.getImages().subscribe(data => {
      this.images = data;
    });
  }
}
