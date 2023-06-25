export type Props = {
  className?: string;
  children: React.ReactNode;
};

export type MealType = {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
};

export type CartType = {
  items: MealType[];
  totalAmount: number;
  addItem?: (item: MealType) => void;
  removeItem?: (id: string) => void;
  clearCart?: () => void;
};

export type CartItemType = {
  item: MealType;
  onRemove: (id: string) => void;
  onAdd: (item: MealType) => void;
};

export type OrderType = {
  id: string;
  items: MealType[];
  totalAmount: number;
  timestamp: Date;
};
