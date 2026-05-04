import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategoryService, Category, SubCategory } from 'src/app/services/product-category.service';

export interface Item {
  id?: number;
  name: string;
  description: string;
  price?: number;
  phone?: string;
  location?: string;
  verified?: boolean;
}

@Component({
  selector: 'app-subcategory-detail',
  templateUrl: './subcategory-detail.component.html',
  styleUrls: ['./subcategory-detail.component.css']
})
export class SubcategoryDetailComponent implements OnInit {
  category: Category | null = null;
  subCategory: SubCategory | null = null;
  items: Item[] = [];
  loading = true;
  showForm = false;
  editingItem: Item | null = null;

  formData: Item = {
    name: '',
    description: '',
    price: 0,
    phone: '',
    location: '',
    verified: false
  };

  displayedColumns: string[] = ['id', 'name', 'description', 'phone', 'location', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const categoryId = Number(params['categoryId']);
      const subCategoryId = Number(params['subCategoryId']);

      this.productCategoryService.getCategoryById(categoryId).subscribe({
        next: (category) => {
          this.category = category || null;
          if (category) {
            this.subCategory = category.subCategories.find(s => s.id === subCategoryId) || null;
          }
          this.loadItems();
        },
        error: (error) => {
          console.error('Error loading category:', error);
          this.loading = false;
        }
      });
    });
  }

  loadItems(): void {
    // Simulating loading items from local storage
    const storedItems = localStorage.getItem(`items_${this.subCategory?.id}`);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
    this.loading = false;
  }

  openForm(): void {
    this.showForm = true;
    this.editingItem = null;
    this.resetForm();
  }

  closeForm(): void {
    this.showForm = false;
    this.editingItem = null;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      name: '',
      description: '',
      price: 0,
      phone: '',
      location: '',
      verified: false
    };
  }

  saveItem(): void {
    if (!this.formData.name || !this.formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.editingItem) {
      const index = this.items.findIndex(item => item.id === this.editingItem?.id);
      if (index > -1) {
        this.items[index] = { ...this.formData, id: this.editingItem.id };
      }
    } else {
      const newItem: Item = {
        ...this.formData,
        id: this.items.length > 0 ? Math.max(...this.items.map(i => i.id || 0)) + 1 : 1
      };
      this.items.push(newItem);
    }

    this.saveToLocalStorage();
    this.closeForm();
  }

  editItem(item: Item): void {
    this.editingItem = item;
    this.formData = { ...item };
    this.showForm = true;
  }

  deleteItem(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this item?')) {
      this.items = this.items.filter(item => item.id !== id);
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage(): void {
    if (this.subCategory) {
      localStorage.setItem(`items_${this.subCategory.id}`, JSON.stringify(this.items));
    }
  }

  goBack(): void {
    if (this.category) {
      this.router.navigate(['/category', this.category.id]);
    }
  }
}
