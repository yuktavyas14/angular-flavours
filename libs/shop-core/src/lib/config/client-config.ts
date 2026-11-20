import { InjectionToken, Provider } from '@angular/core';

/**
 * Every feature the base product has that a client can switch ON/OFF.
 * Add a new key here, and TypeScript forces every client config to set it.
 */
export type FeatureKey =
  | 'wishlist' //  ♡ Wishlist button on product page
  | 'ratings' //   ★ rating on product cards
  | 'deals' //     /deals page + "Deals" link in header
  | 'flashSale' // sale strip in header
  | 'primeBadge'; // Prime banner on home

export type FeatureFlags = Record<FeatureKey, boolean>;

/** Everything that differs between clients but is "just data". */
export interface ClientConfig {
  id: string;
  name: string;
  tagline: string;
  currency: string;
  apiBaseUrl: string;
  features: FeatureFlags;
}

export const CLIENT_CONFIG = new InjectionToken<ClientConfig>('CLIENT_CONFIG');

export function provideClientConfig(config: ClientConfig): Provider {
  return { provide: CLIENT_CONFIG, useValue: config };
}
