import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product, ProductFilter } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAdminProducts() {
    return this.http.get(`${environment.apiUrl}/api/products`, {
      responseType: 'json',
    });
  }
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products`, {
      responseType: 'json',
    });
  }

  createProduct(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/products`, {
      responseType: 'json',
    });
  }

  createReview(
    productId: string,
    comment: string,
    rating: number
  ): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/products/${productId}/reviews`,
      { comment, rating },
      {
        responseType: 'json',
      }
    );
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/products/${productId}`, {
      responseType: 'json',
    });
  }


  searchProducts(productFilter: ProductFilter): Observable<any> {
    const params = this.buildQueryParams(productFilter);

    return this.http.get(`${environment.apiUrl}/api/products`, {
      params,
      responseType: 'json',
    });
  }

  private buildQueryParams(productFilter: ProductFilter): HttpParams {
    let queryParams = new HttpParams();

    if (productFilter.name) {
      queryParams = queryParams.set('name', productFilter.name);
    }

    if (productFilter.category) {
      queryParams = queryParams.set('category', productFilter.category);
    }

    return queryParams;
  }

  
  getCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products/categories`, {
      responseType: 'json',
    });
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products/${productId}`, {
      responseType: 'json',
    });
  }

  getProductBySlug(slug: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products/slug/${slug}`, {
      responseType: 'json',
    });
  }
  postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(`${environment.apiUrl}/api/uploads`, formData);
  }

  update(product: Product) {
    return this.http.put<Product>(
      `${environment.apiUrl}/api/products/${product._id}`,
      product
    );
  }
}
