import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';

/** Only reachable for clients with features.deals = true (see shop.routes.ts). */
@Component({
  selector: 'core-deals-page',
  imports: [ProductCardComponent],
  template: `
    <h1>Today's deals</h1>
    <div class="grid">
      @for (p of deals; track p.id) {
        <div class="deal">
          <span class="off">{{ off(p.price, p.mrp) }}% off</span>
          <core-product-card [product]="p" />
        </div>
      }
    </div>
  `,
  styles: `
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .deal { position: relative; }
    .off { position: absolute; top: 8px; left: 8px; z-index: 1; background: #cc0c39; color: #fff; padding: 2px 8px; border-radius: 4px; font-weight: 700; }
  `,
})
export class DealsPage {
  protected readonly deals = [...inject(ProductService).getAll()].sort(
    (a, b) => this.off(b.price, b.mrp) - this.off(a.price, a.mrp),
  );

  protected off(price: number, mrp: number): number {
    return Math.round((1 - price / mrp) * 100);
  }
}
