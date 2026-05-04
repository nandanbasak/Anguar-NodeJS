import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private categoriesUrl = 'assets/data/categories-database.json';
  private subcategoriesUrl = 'assets/data/subcategories-database.json';

  private categoriesSubject = new BehaviorSubject<any[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  private subcategoriesSubject = new BehaviorSubject<any>({});
  public subcategories$ = this.subcategoriesSubject.asObservable();

  private selectedLocationSubject = new BehaviorSubject<string>('');
  public selectedLocation$ = this.selectedLocationSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeData();
  }

  /**
   * Initialize and load data from JSON files
   */
  private initializeData(): void {
    this.loadCategories();
    this.loadSubcategories();
  }

  /**
   * CRUD OPERATIONS FOR CATEGORIES
   */

  /**
   * Get all categories
   */
  getCategories(): Observable<any[]> {
    return this.http.get<any>(this.categoriesUrl).pipe(
      map(data => data.categories || [])
    );
  }

  /**
   * Get category by ID
   */
  getCategoryById(id: number): Observable<any> {
    return this.getCategories().pipe(
      map(categories => categories.find(cat => cat.id === id) || null)
    );
  }

  /**
   * Create new category
   */
  createCategory(category: any): Observable<any> {
    return new Observable(observer => {
      this.getCategories().subscribe(categories => {
        const newCategory = {
          ...category,
          id: Math.max(...categories.map(c => c.id), 0) + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        observer.next(newCategory);
        observer.complete();
      });
    });
  }

  /**
   * Update category
   */
  updateCategory(id: number, category: any): Observable<any> {
    return new Observable(observer => {
      this.getCategories().subscribe(categories => {
        const index = categories.findIndex(cat => cat.id === id);
        if (index !== -1) {
          const updated = {
            ...categories[index],
            ...category,
            updatedAt: new Date().toISOString()
          };
          observer.next(updated);
        } else {
          observer.error('Category not found');
        }
        observer.complete();
      });
    });
  }

  /**
   * Delete category
   */
  deleteCategory(id: number): Observable<boolean> {
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  /**
   * CRUD OPERATIONS FOR SUBCATEGORIES
   */

  /**
   * Get all subcategories
   */
  getSubcategories(): Observable<any> {
    return this.http.get<any>(this.subcategoriesUrl);
  }

  /**
   * Get subcategories by category ID
   */
  getSubcategoriesByCategory(categoryId: number): Observable<any[]> {
    return this.getSubcategories().pipe(
      map(data => data.subcategories[categoryId] || [])
    );
  }

  /**
   * Get subcategory by ID within a category
   */
  getSubcategoryById(categoryId: number, subcategoryId: number): Observable<any> {
    return this.getSubcategoriesByCategory(categoryId).pipe(
      map(subcategories => subcategories.find(sub => sub.id === subcategoryId) || null)
    );
  }

  /**
   * Create new subcategory
   */
  createSubcategory(categoryId: number, subcategory: any): Observable<any> {
    return new Observable(observer => {
      this.getSubcategoriesByCategory(categoryId).subscribe(subs => {
        const newSubcategory = {
          ...subcategory,
          categoryId,
          id: Math.max(...subs.map(s => s.id), categoryId * 100) + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        observer.next(newSubcategory);
        observer.complete();
      });
    });
  }

  /**
   * Update subcategory
   */
  updateSubcategory(categoryId: number, subcategoryId: number, subcategory: any): Observable<any> {
    return new Observable(observer => {
      this.getSubcategoriesByCategory(categoryId).subscribe(subs => {
        const index = subs.findIndex(sub => sub.id === subcategoryId);
        if (index !== -1) {
          const updated = {
            ...subs[index],
            ...subcategory,
            updatedAt: new Date().toISOString()
          };
          observer.next(updated);
        } else {
          observer.error('Subcategory not found');
        }
        observer.complete();
      });
    });
  }

  /**
   * Delete subcategory
   */
  deleteSubcategory(categoryId: number, subcategoryId: number): Observable<boolean> {
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  /**
   * PROFESSIONAL SERVICES
   */

  /**
   * Get all professionals in a subcategory
   */
  getProfessionals(categoryId: number, subcategoryId: number): Observable<any[]> {
    return this.getSubcategoryById(categoryId, subcategoryId).pipe(
      map(subcategory => subcategory?.professionals || [])
    );
  }

  /**
   * Get professional by ID
   */
  getProfessionalById(categoryId: number, subcategoryId: number, professionalId: string): Observable<any> {
    return this.getProfessionals(categoryId, subcategoryId).pipe(
      map(professionals => professionals.find(prof => prof.id === professionalId) || null)
    );
  }

  /**
   * Create professional
   */
  createProfessional(categoryId: number, subcategoryId: number, professional: any): Observable<any> {
    return new Observable(observer => {
      this.getProfessionals(categoryId, subcategoryId).subscribe(professionals => {
        const newProfessional = {
          ...professional,
          id: 'prof_' + Date.now()
        };
        observer.next(newProfessional);
        observer.complete();
      });
    });
  }

  /**
   * Update professional
   */
  updateProfessional(categoryId: number, subcategoryId: number, professionalId: string, professional: any): Observable<any> {
    return new Observable(observer => {
      this.getProfessionals(categoryId, subcategoryId).subscribe(professionals => {
        const index = professionals.findIndex(prof => prof.id === professionalId);
        if (index !== -1) {
          const updated = { ...professionals[index], ...professional };
          observer.next(updated);
        } else {
          observer.error('Professional not found');
        }
        observer.complete();
      });
    });
  }

  /**
   * Delete professional
   */
  deleteProfessional(categoryId: number, subcategoryId: number, professionalId: string): Observable<boolean> {
    return new Observable(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  /**
   * UTILITY METHODS
   */

  /**
   * Load categories and update subject
   */
  private loadCategories(): void {
    this.getCategories().subscribe(
      categories => this.categoriesSubject.next(categories),
      error => console.error('Error loading categories:', error)
    );
  }

  /**
   * Load subcategories and update subject
   */
  private loadSubcategories(): void {
    this.getSubcategories().subscribe(
      data => this.subcategoriesSubject.next(data.subcategories || {}),
      error => console.error('Error loading subcategories:', error)
    );
  }

  /**
   * Set selected location
   */
  setSelectedLocation(location: string): void {
    this.selectedLocationSubject.next(location);
  }

  /**
   * Get selected location
   */
  getSelectedLocation(): Observable<string> {
    return this.selectedLocationSubject.asObservable();
  }

  /**
   * Search products by name
   */
  searchProducts(keyword: string, categoryId?: number): Observable<any[]> {
    return this.getCategories().pipe(
      map(categories => {
        let results: any[] = [];
        categories.forEach(category => {
          if (!categoryId || category.id === categoryId) {
            if (category.name.toLowerCase().includes(keyword.toLowerCase()) ||
                category.description.toLowerCase().includes(keyword.toLowerCase())) {
              results.push(category);
            }
          }
        });
        return results;
      })
    );
  }

  /**
   * Get categories with location filter
   */
  getCategoriesByLocation(location: string): Observable<any[]> {
    return this.getCategories();
  }

  /**
   * Get featured categories
   */
  getFeaturedCategories(): Observable<any[]> {
    return this.getCategories().pipe(
      map(categories => categories.slice(0, 4))
    );
  }
}
