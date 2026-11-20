import { ClientConfig } from 'shop-core';

export const clientConfig: ClientConfig = {
  id: 'amazon',
  name: 'Amazon',
  tagline: 'Spend less. Smile more.',
  currency: 'INR',
  apiBaseUrl: 'https://api.amazon.example.com',
  features: {
    wishlist: true,
    ratings: true,
    deals: false, // Amazon does NOT get the Deals page (link hidden + /deals blocked)
    flashSale: false,
    primeBadge: true,
  },
};
