import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CLIENT_CONFIG, CartService, IfFeatureDirective } from 'shop-core';

/**
 * FLIPKART header. Replaces libs/shop-core/src/lib/layout/header/header.component.ts
 * for the flipkart build. Same class name + selector, different structure.
 */
@Component({
  selector: 'core-header',
  imports: [RouterLink, IfFeatureDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly config = inject(CLIENT_CONFIG);
  protected readonly cart = inject(CartService);
  protected readonly categories = ['Mobiles', 'Fashion', 'Electronics', 'Home', 'Grocery'];
}
