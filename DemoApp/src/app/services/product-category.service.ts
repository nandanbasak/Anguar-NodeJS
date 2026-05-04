import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface SubCategory {
  id: number;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
  subCategories: SubCategory[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  private selectedCategorySubject = new BehaviorSubject<Category | null>(null);
  public selectedCategory$ = this.selectedCategorySubject.asObservable();

  private selectedSubCategorySubject = new BehaviorSubject<SubCategory | null>(null);
  public selectedSubCategory$ = this.selectedSubCategorySubject.asObservable();

  private database: any = {};
  private dataRefresh$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.loadCategories();
    this.loadDatabase();
  }

  private loadCategories(): void {
    this.http.get<{ categories: Category[] }>('assets/data/product-categories.json')
      .pipe(
        map(data => data.categories),
        tap(categories => this.categoriesSubject.next(categories))
      )
      .subscribe({
        error: (err) => console.error('Error loading categories:', err)
      });
  }

  private loadDatabase(): void {
    this.http.get<any>('assets/data/database.json')
      .subscribe({
        next: (data) => {
          this.database = data;
        },
        error: (err) => console.error('Error loading database:', err)
      });
  }

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  getCategoryById(id: number): Observable<Category | undefined> {
    return this.categories$.pipe(
      map(categories => categories.find(cat => cat.id === id))
    );
  }

  getSubCategoryById(categoryId: number, subCategoryId: number): Observable<SubCategory | undefined> {
    return this.categories$.pipe(
      map(categories => {
        const category = categories.find(cat => cat.id === categoryId);
        return category?.subCategories.find(sub => sub.id === subCategoryId);
      })
    );
  }

  setSelectedCategory(category: Category): void {
    this.selectedCategorySubject.next(category);
  }

  setSelectedSubCategory(subCategory: SubCategory): void {
    this.selectedSubCategorySubject.next(subCategory);
  }

  getSelectedCategory(): Observable<Category | null> {
    return this.selectedCategory$;
  }

  getSelectedSubCategory(): Observable<SubCategory | null> {
    return this.selectedSubCategory$;
  }

  // CRUD Operations for subcategory data
  getDataBySubCategory(categoryCode: string, subCategoryCode: string): Observable<any[]> {
    return new Observable(observer => {
      if (this.database[categoryCode] && this.database[categoryCode][subCategoryCode]) {
        observer.next(this.database[categoryCode][subCategoryCode]);
      } else {
        observer.next([]);
      }
      observer.complete();
    });
  }

  // Create (Add new item)
  addItem(categoryCode: string, subCategoryCode: string, item: any): Observable<any> {
    return new Observable(observer => {
      if (!this.database[categoryCode]) {
        this.database[categoryCode] = {};
      }
      if (!this.database[categoryCode][subCategoryCode]) {
        this.database[categoryCode][subCategoryCode] = [];
      }

      const newId = Math.max(...this.database[categoryCode][subCategoryCode].map((i: any) => i.id || 0)) + 1;
      const newItem = { ...item, id: newId };
      this.database[categoryCode][subCategoryCode].push(newItem);
      this.saveDatabase();
      this.dataRefresh$.next();
      observer.next(newItem);
      observer.complete();
    });
  }

  // Read (Get single item)
  getItem(categoryCode: string, subCategoryCode: string, id: number): Observable<any> {
    return new Observable(observer => {
      if (this.database[categoryCode] && this.database[categoryCode][subCategoryCode]) {
        const item = this.database[categoryCode][subCategoryCode].find((i: any) => i.id === id);
        observer.next(item || null);
      } else {
        observer.next(null);
      }
      observer.complete();
    });
  }

  // Update (Modify existing item)
  updateItem(categoryCode: string, subCategoryCode: string, id: number, updatedItem: any): Observable<any> {
    return new Observable(observer => {
      if (this.database[categoryCode] && this.database[categoryCode][subCategoryCode]) {
        const index = this.database[categoryCode][subCategoryCode].findIndex((i: any) => i.id === id);
        if (index > -1) {
          this.database[categoryCode][subCategoryCode][index] = { ...updatedItem, id };
          this.saveDatabase();
          this.dataRefresh$.next();
          observer.next(this.database[categoryCode][subCategoryCode][index]);
        } else {
          observer.error('Item not found');
        }
      } else {
        observer.error('Category or subcategory not found');
      }
      observer.complete();
    });
  }

  // Delete (Remove item)
  deleteItem(categoryCode: string, subCategoryCode: string, id: number): Observable<boolean> {
    return new Observable(observer => {
      if (this.database[categoryCode] && this.database[categoryCode][subCategoryCode]) {
        const index = this.database[categoryCode][subCategoryCode].findIndex((i: any) => i.id === id);
        if (index > -1) {
          this.database[categoryCode][subCategoryCode].splice(index, 1);
          this.saveDatabase();
          this.dataRefresh$.next();
          observer.next(true);
        } else {
          observer.next(false);
        }
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  private saveDatabase(): void {
    localStorage.setItem('app_database', JSON.stringify(this.database));
  }

  getDataRefresh(): Observable<void> {
    return this.dataRefresh$.asObservable();
  }
}
