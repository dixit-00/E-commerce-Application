export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  discount?: number; // Optional property for discount percentage
  isNew?: boolean;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

export interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface NotificationType {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}
