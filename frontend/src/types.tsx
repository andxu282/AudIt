export enum ItemCategory {
  DAILY_NEEDS = "Daily Needs",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

export enum ItemType {
  SUBSCRIPTION = "Subscription",
  ITEM = "Item",
}

export type Item = {
  id: string;
  name: string;
  amount: number;
  // how frequently this is bought, in months
  frequency: number;
  category: ItemCategory;
  type: ItemType;
};
