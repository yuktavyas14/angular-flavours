import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CLIENT_CONFIG } from '../../config/client-config';
import { CartService } from '../../services/cart.service';
import { IfFeatureDirective } from '../../features/feature-flags';

/** BASE header. A client can swap this file via fileReplacements. */
@Component({
  selector: 'core-header',
  imports: [RouterLink, IfFeatureDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly config = inject(CLIENT_CONFIG);
  protected readonly cart = inject(CartService);
}
