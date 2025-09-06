export enum ItemCategoryEnum {
  DAILY_NEEDS = "Daily Needs",
  MONTHLY = "Monthly",
  YEARLY = "Yearly",
}

export enum ItemTypeEnum {
  SUBSCRIPTION = "Subscription",
  ITEM = "Item",
}

export function formatMoney(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

const DAILY_NEEDS_COLOR = "#ffecec";
const DAILY_NEEDS_TEXT_COLOR = "#ff7171";
const MONTHLY_COLOR = "#c4ffc7";
const MONTHLY_TEXT_COLOR = "#257d2a";
const YEARLY_COLOR = "#d9edff";
const YEARLY_TEXT_COLOR = "#137ba8";

export function getCategoryTagBackgroundColor(
  category: ItemCategoryEnum
): string {
  switch (category) {
    case ItemCategoryEnum.DAILY_NEEDS:
      return DAILY_NEEDS_COLOR;
    case ItemCategoryEnum.MONTHLY:
      return MONTHLY_COLOR;
    case ItemCategoryEnum.YEARLY:
      return YEARLY_COLOR;
    default:
      return DAILY_NEEDS_COLOR;
  }
}

export function getCategoryTagTextColor(category: ItemCategoryEnum): string {
  switch (category) {
    case ItemCategoryEnum.DAILY_NEEDS:
      return DAILY_NEEDS_TEXT_COLOR;
    case ItemCategoryEnum.MONTHLY:
      return MONTHLY_TEXT_COLOR;
    case ItemCategoryEnum.YEARLY:
      return YEARLY_TEXT_COLOR;
  }
}

export function getTypeTagBackgroundColor(type: ItemTypeEnum): string {
  switch (type) {
    case ItemTypeEnum.SUBSCRIPTION:
      return "";
    case ItemTypeEnum.ITEM:
      return "";
  }
}

export function getTypeTagTextColor(type: ItemTypeEnum): string {
  switch (type) {
    case ItemTypeEnum.SUBSCRIPTION:
      return "";
    case ItemTypeEnum.ITEM:
      return "";
  }
}
