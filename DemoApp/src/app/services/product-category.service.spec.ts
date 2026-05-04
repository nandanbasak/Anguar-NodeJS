import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductCategoryService } from './product-category.service';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductCategoryService]
    });
    service = TestBed.inject(ProductCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
