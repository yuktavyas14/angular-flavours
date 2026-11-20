import { Component, inject } from '@angular/core';
import { CLIENT_CONFIG, ProductCardComponent, ProductService } from 'shop-core';

/**
 * AMAZON home page. Replaces libs/shop-core/src/lib/pages/home/home.page.ts
 * for the amazon build. Must export the same class name (HomePage).
 */
@Component({
  selector: 'core-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  protected readonly config = inject(CLIENT_CONFIG);
  private readonly all = inject(ProductService).getAll();
  protected readonly categories = [...new Set(this.all.map((p) => p.category))];
  protected readonly byCategory = (c: string) => this.all.filter((p) => p.category === c);
}
