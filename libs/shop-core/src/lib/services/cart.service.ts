import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().reduce((n, i) => n + i.qty, 0));
  readonly total = computed(() => this._items().reduce((n, i) => n + i.qty * i.product.price, 0));

  add(product: Product): void {
    this._items.update((items) => {
      const hit = items.find((i) => i.product.id === product.id);
      return hit
        ? items.map((i) => (i === hit ? { ...i, qty: i.qty + 1 } : i))
        : [...items, { product, qty: 1 }];
    });
  }

  remove(id: number): void {
    this._items.update((items) => items.filter((i) => i.product.id !== id));
  }
}
