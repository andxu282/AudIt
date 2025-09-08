/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export type ItemType = "Subscription" | "Item";
export type ItemCategory = "Daily Needs" | "Monthly" | "Yearly";

export interface ItemBase {
  name: string;
  amount: number;
  type: ItemType;
  category: ItemCategory;
  frequency: number;
}
export interface ItemCreate {
  name: string;
  amount: number;
  type: ItemType;
  category: ItemCategory;
  frequency: number;
}
export interface ItemEdit {
  name?: string | null;
  amount?: number | null;
  type?: ItemType | null;
  category?: ItemCategory | null;
  frequency?: number | null;
}
export interface ItemSchema {
  name: string;
  amount: number;
  type: ItemType;
  category: ItemCategory;
  frequency: number;
  id: string;
  created_at: string;
  updated_at: string;
}
