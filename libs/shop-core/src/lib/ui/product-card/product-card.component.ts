import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CLIENT_CONFIG } from '../../config/client-config';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { IfFeatureDirective } from '../../features/feature-flags';

@Component({
  selector: 'core-product-card',
  imports: [CurrencyPipe, RouterLink, IfFeatureDirective],
  template: `
    @let p = product();
    <article class="card">
      <a [routerLink]="['/products', p.id]"><img [src]="p.image" [alt]="p.title" /></a>
      <h3>{{ p.title }}</h3>
      <div>
        <b>{{ p.price | currency: config.currency }}</b>
        <s>{{ p.mrp | currency: config.currency }}</s>
      </div>
      <div *coreIfFeature="'ratings'">★ {{ p.rating }}</div>
      <button (click)="cart.add(p)">Add to cart</button>
    </article>
  `,
  styles: `
    .card { background: var(--surface); border-radius: var(--radius); padding: 12px; display: flex; flex-direction: column; gap: 6px; }
    img { width: 100%; border-radius: var(--radius); }
    h3 { margin: 0; font-size: 1rem; }
    s { color: #888; font-size: .85rem; margin-left: 6px; }
    button { background: var(--brand-accent); border: 0; padding: 8px; border-radius: var(--radius); cursor: pointer; font-weight: 600; }
  `,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  protected readonly config = inject(CLIENT_CONFIG);
  protected readonly cart = inject(CartService);
}
