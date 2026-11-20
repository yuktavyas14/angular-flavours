import { ClientConfig } from 'shop-core';

/**
 * DEFAULT (base) client config.
 * Each client replaces this file with clients/<client>/client.config.ts
 * via "fileReplacements" in angular.json.
 */
export const clientConfig: ClientConfig = {
  id: 'base',
  name: 'Base Shop',
  tagline: 'The white-label storefront',
  currency: 'INR',
  apiBaseUrl: 'https://api.example.com',
  features: {
    wishlist: true,
    ratings: true,
    deals: true,
    flashSale: false,
    primeBadge: false,
  },
};
