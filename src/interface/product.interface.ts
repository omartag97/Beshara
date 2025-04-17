export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface CartItem extends Product {
  quantity: number;
  position?: number;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  address: string;
}
