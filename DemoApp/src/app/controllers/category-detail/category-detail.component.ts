import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryService, Category, SubCategory } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category: Category | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const categoryId = Number(params['id']);
      this.productCategoryService.getCategoryById(categoryId).subscribe({
        next: (category) => {
          this.category = category || null;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading category:', error);
          this.loading = false;
        }
      });
    });
  }

  selectSubCategory(subCategory: SubCategory): void {
    if (this.category) {
      this.productCategoryService.setSelectedSubCategory(subCategory);
      this.router.navigate([`/subcategory/${this.category.id}/${subCategory.id}`]);
    }
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
