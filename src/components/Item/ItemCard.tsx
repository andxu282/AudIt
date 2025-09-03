import {
  getCategoryTagBackgroundColor,
  getCategoryTagTextColor,
  formatMoney,
} from "../../utils";
import { Item } from "../../types";

type ItemProps = {
  item: Item;
};

function ItemCard({ item }: ItemProps) {
  return (
    <div className="item-card">
      <div className="item-info">
        <div className="item-title-container">
          <h2 className="item-title">{item.name}</h2>
          <div
            className="item-tag"
            style={{
              color: getCategoryTagTextColor(item.category),
              backgroundColor: getCategoryTagBackgroundColor(item.category),
            }}
          >
            {item.category}
          </div>
        </div>
        <p className="item-amount">
          {formatMoney(item.amount / item.frequency)}/month{" "}
        </p>
      </div>
      <div className="item-buttons">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default ItemCard;
