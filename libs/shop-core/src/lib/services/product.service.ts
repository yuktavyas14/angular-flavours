import { Injectable, inject } from '@angular/core';
import { CLIENT_CONFIG } from '../config/client-config';
import { Product } from '../models/product.model';

const MOCK: Product[] = [
  { id: 1, title: 'Wireless Headphones', price: 2499, mrp: 3999, rating: 4.3, category: 'Electronics', image: 'https://picsum.photos/seed/p1/400/300' },
  { id: 2, title: 'Smart Watch', price: 4999, mrp: 7999, rating: 4.1, category: 'Electronics', image: 'https://picsum.photos/seed/p2/400/300' },
  { id: 3, title: 'Running Shoes', price: 1899, mrp: 2999, rating: 4.5, category: 'Fashion', image: 'https://picsum.photos/seed/p3/400/300' },
  { id: 4, title: 'Coffee Maker', price: 3299, mrp: 4500, rating: 4.0, category: 'Home', image: 'https://picsum.photos/seed/p4/400/300' },
  { id: 5, title: 'Backpack', price: 999, mrp: 1799, rating: 4.4, category: 'Fashion', image: 'https://picsum.photos/seed/p5/400/300' },
  { id: 6, title: 'Bluetooth Speaker', price: 1599, mrp: 2499, rating: 4.2, category: 'Electronics', image: 'https://picsum.photos/seed/p6/400/300' },
];

/** Swap MOCK for HttpClient calls to `config.apiBaseUrl` once a backend exists. */
@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly config = inject(CLIENT_CONFIG);

  getAll(): Product[] {
    return MOCK;
  }

  getById(id: number): Product | undefined {
    return MOCK.find((p) => p.id === id);
  }
}
