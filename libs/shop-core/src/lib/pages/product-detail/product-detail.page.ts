import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CLIENT_CONFIG } from '../../config/client-config';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { IfFeatureDirective } from '../../features/feature-flags';

@Component({
  selector: 'core-product-detail-page',
  imports: [CurrencyPipe, IfFeatureDirective],
  template: `
    @if (product(); as p) {
      <div class="detail">
        <img [src]="p.image" [alt]="p.title" />
        <div>
          <h1>{{ p.title }}</h1>
          <p class="price">{{ p.price | currency: config.currency }}</p>
          <button *coreIfFeature="'wishlist'" class="ghost">♡ Wishlist</button>
          <button (click)="cart.add(p)">Add to cart</button>
        </div>
      </div>
    } @else {
      <p>Product not found.</p>
    }
  `,
  styles: `
    .detail { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    img { width: 100%; border-radius: var(--radius); }
    .price { font-size: 1.5rem; font-weight: 700; }
    button { background: var(--brand-accent); border: 0; padding: 10px 16px; border-radius: var(--radius); margin-right: 8px; cursor: pointer; }
    .ghost { background: transparent; border: 1px solid currentColor; }
  `,
})
export class ProductDetailPage {
  /** Bound from the :id route param (withComponentInputBinding). */
  readonly id = input(0, { transform: numberAttribute });
  protected readonly config = inject(CLIENT_CONFIG);
  protected readonly cart = inject(CartService);
  private readonly products = inject(ProductService);
  protected readonly product = computed(() => this.products.getById(this.id()));
}
