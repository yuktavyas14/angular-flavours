import {
  Directive,
  Injectable,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { CLIENT_CONFIG, FeatureKey } from '../config/client-config';

/** In TypeScript: `inject(FeatureService).isEnabled('wishlist')` */
@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly flags = inject(CLIENT_CONFIG).features;

  isEnabled(key: FeatureKey): boolean {
    return this.flags[key] === true;
  }
}

/**
 * In templates: show an element only when the client has the feature.
 *   <button *coreIfFeature="'wishlist'">♡ Wishlist</button>
 */
@Directive({ selector: '[coreIfFeature]' })
export class IfFeatureDirective {
  readonly coreIfFeature = input.required<FeatureKey>();

  constructor() {
    const tpl = inject(TemplateRef);
    const vcr = inject(ViewContainerRef);
    const features = inject(FeatureService);
    effect(() => {
      vcr.clear();
      if (features.isEnabled(this.coreIfFeature())) vcr.createEmbeddedView(tpl);
    });
  }
}

/**
 * On routes: the route does not exist for clients without the feature
 * (the page's code is never even downloaded; the URL falls through to '**').
 *   { path: 'deals', canMatch: [featureGuard('deals')], loadComponent: ... }
 */
export function featureGuard(key: FeatureKey): CanMatchFn {
  return () => inject(FeatureService).isEnabled(key);
}
