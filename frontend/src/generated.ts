/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export type ItemType = "Subscription" | "Item";
export type ItemCategory = "Daily Needs" | "Monthly" | "Yearly";

export interface ItemSchema {
  id: string;
  name: string;
  amount: number;
  type: ItemType;
  category: ItemCategory;
  frequency: number;
}
export interface UserSchema {
  id: string;
  name: string;
  email: string;
}
