import {
  getCategoryTagBackgroundColor,
  getCategoryTagTextColor,
  formatMoney,
} from "../../utils";
import { Item } from "../../types";
import { Dispatch, SetStateAction } from "react";

type ItemProps = {
  item: Item;
  setItems: Dispatch<SetStateAction<Item[]>>;
};

function ItemCard({ item, setItems }: ItemProps) {
  const handleDeleteItem = () => {
    setItems((prevItems) => prevItems.filter((i) => i.id != item.id));
  };

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
        <button className="edit-button">Edit</button>
        <button className="delete-button" onClick={handleDeleteItem}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
