export interface Product {
  id: number;
  title: string;
  price: number;
  mrp: number;
  rating: number;
  category: string;
  image: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}
