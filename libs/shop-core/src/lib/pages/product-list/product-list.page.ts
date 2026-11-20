import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';

@Component({
  selector: 'core-product-list-page',
  imports: [ProductCardComponent],
  template: `
    <h1>All products</h1>
    <div class="grid">
      @for (p of products; track p.id) {
        <core-product-card [product]="p" />
      }
    </div>
  `,
  styles: `.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }`,
})
export class ProductListPage {
  protected readonly products = inject(ProductService).getAll();
}
