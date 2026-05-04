import { Component, OnInit } from '@angular/core';
import { ProductCategoryService, Category } from 'src/app/services/product-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  loading = true;

  constructor(
    private productCategoryService: ProductCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productCategoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.loading = false;
      }
    });
  }

  selectCategory(category: Category): void {
    this.productCategoryService.setSelectedCategory(category);
    this.router.navigate(['/category', category.id]);
  }
}
