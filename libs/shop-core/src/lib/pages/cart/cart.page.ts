import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CLIENT_CONFIG } from '../../config/client-config';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'core-cart-page',
  imports: [CurrencyPipe],
  template: `
    <h1>Your cart</h1>
    @for (i of cart.items(); track i.product.id) {
      <div class="row">
        <span>{{ i.product.title }} × {{ i.qty }}</span>
        <span>{{ i.qty * i.product.price | currency: config.currency }}</span>
        <button (click)="cart.remove(i.product.id)">Remove</button>
      </div>
    } @empty {
      <p>Your cart is empty.</p>
    }
    <h2>Total: {{ cart.total() | currency: config.currency }}</h2>
  `,
  styles: `.row { display: flex; gap: 16px; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ddd; }`,
})
export class CartPage {
  protected readonly config = inject(CLIENT_CONFIG);
  protected readonly cart = inject(CartService);
}
