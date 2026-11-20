import { Component, inject } from '@angular/core';
import { CLIENT_CONFIG } from '../../config/client-config';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';

/** BASE home page. A client can swap this whole file via fileReplacements. */
@Component({
  selector: 'core-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  protected readonly config = inject(CLIENT_CONFIG);
  protected readonly products = inject(ProductService).getAll().slice(0, 4);
}
