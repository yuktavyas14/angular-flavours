import { ClientConfig } from 'shop-core';

export const clientConfig: ClientConfig = {
  id: 'flipkart',
  name: 'Flipkart',
  tagline: 'Explore Plus',
  currency: 'INR',
  apiBaseUrl: 'https://api.flipkart.example.com',
  features: {
    wishlist: false, // Flipkart does NOT get the Wishlist button
    ratings: true,
    deals: true,
    flashSale: true,
    primeBadge: false,
  },
};
