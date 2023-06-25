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
};
