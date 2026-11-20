import { Component, inject } from '@angular/core';
import { CLIENT_CONFIG } from '../../config/client-config';

@Component({
  selector: 'core-footer',
  template: `<footer>© {{ year }} {{ config.name }} · {{ config.tagline }}</footer>`,
  styles: `footer { padding: 24px; text-align: center; background: var(--brand-secondary); color: var(--brand-on-primary); }`,
})
export class FooterComponent {
  protected readonly config = inject(CLIENT_CONFIG);
  protected readonly year = new Date().getFullYear();
}
