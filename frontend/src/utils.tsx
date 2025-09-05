import { ItemCategory, ItemType } from "./types";

export function formatMoney(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

const DAILY_NEEDS_COLOR = "#ffecec";
const DAILY_NEEDS_TEXT_COLOR = "#ff7171";
const MONTHLY_COLOR = "#c4ffc7";
const MONTHLY_TEXT_COLOR = "#257d2a";
const YEARLY_COLOR = "#d9edff";
const YEARLY_TEXT_COLOR = "#137ba8";

export function getCategoryTagBackgroundColor(category: ItemCategory): string {
  switch (category) {
    case ItemCategory.DAILY_NEEDS:
      return DAILY_NEEDS_COLOR;
    case ItemCategory.MONTHLY:
      return MONTHLY_COLOR;
    case ItemCategory.YEARLY:
      return YEARLY_COLOR;
  }
}

export function getCategoryTagTextColor(category: ItemCategory): string {
  switch (category) {
    case ItemCategory.DAILY_NEEDS:
      return DAILY_NEEDS_TEXT_COLOR;
    case ItemCategory.MONTHLY:
      return MONTHLY_TEXT_COLOR;
    case ItemCategory.YEARLY:
      return YEARLY_TEXT_COLOR;
  }
}

export function getTypeTagBackgroundColor(type: ItemType): string {
  switch (type) {
    case ItemType.SUBSCRIPTION:
      return "";
    case ItemType.ITEM:
      return "";
  }
}

export function getTypeTagTextColor(type: ItemType): string {
  switch (type) {
    case ItemType.SUBSCRIPTION:
      return "";
    case ItemType.ITEM:
      return "";
  }
}
