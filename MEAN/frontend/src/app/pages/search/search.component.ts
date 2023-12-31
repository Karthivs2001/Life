import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductFilter } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  category = '';
  name = '';
  loading = true;
  error = false;
  products!: Product[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private cartService: CartService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((p) => {
      this.category = p.category || '';
      this.name = p.name || '';
      this.searchProducts();
    });

    this.titleService.setTitle('Mozeerat');
  }

  searchProducts() {
    // Check if name is provided, if not, use category for search
    const searchCriteria: ProductFilter = {};
    if (this.name) {
      searchCriteria.name = this.name;
    } else if (this.category) {
      searchCriteria.category = this.category;
    }

    this.productService
      .searchProducts(searchCriteria)
      .subscribe(
        (products: any) => {
          this.loading = false;
          this.products = products;
          this.cd.detectChanges();
        },
        (err) => {
          this.loading = false;
          this.error = true;
          this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
        }
      );
  }

  
  addToCart(product: Product) {
    const { _id, image, name, slug, price } = product;
    this.cartService
      .add({ _id, image, name, slug, price, quantity: 1 })
      .subscribe(
        (productName) =>
          this.snackBar.open(`${productName} added to the cart`, '', {
            panelClass: 'success-snackbar',
          }),
        (err) => {
          this.snackBar.open(err.message, '', { panelClass: 'error-snackbar' });
        }
      );
  }
}
