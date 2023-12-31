import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from './models';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { MatSidenav } from '@angular/material/sidenav';
import { ProductService } from './services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  categories: string[] = []; // Assuming categories is an array of strings
  searchForm: FormGroup;
  title = 'Mozeerat';
  itemsCount: number = 0;
  currentUser: UserInfo | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService
  ) {
    this.searchForm = this.formBuilder.group({
      name: [''],
    });
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    this.cartService.currentCart.subscribe(
      (x) => (this.itemsCount = x.itemsCount)
    );
    this.productService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  onSubmit() {
    const nameSearchValue = this.searchForm.controls.name.value; // Use 'name' instead of 'category'

    // First, search by name
    this.router.navigate(['/search'], {
      queryParams: { category: nameSearchValue },
    });

    // If the name search doesn't yield any results, search by category
    if (nameSearchValue && this.categories.indexOf(nameSearchValue) === -1) {
      this.router.navigate(['/search'], {
        queryParams: { name: nameSearchValue },
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
