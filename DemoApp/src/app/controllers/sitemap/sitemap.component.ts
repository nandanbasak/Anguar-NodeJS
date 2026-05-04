import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {
  categories: any[] = [];
  currentYear: number = new Date().getFullYear();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetch categories from ProductService
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Categories loaded in sitemap:', this.categories.length);
      },
      error: (err) => {
        console.error('Error loading categories in sitemap:', err);
      }
    });
  }
}
