import { ItemSchema } from "../../generated";
import {
  getCategoryTagBackgroundColor,
  getCategoryTagTextColor,
  formatMoney,
  ItemCategoryEnum,
} from "../../utils";
import { Dispatch, SetStateAction } from "react";

type ItemProps = {
  item: ItemSchema;
  setItems: Dispatch<SetStateAction<ItemSchema[]>>;
  setIsEditItemModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedItem: Dispatch<SetStateAction<ItemSchema | undefined>>;
};

function ItemCard({
  item,
  setItems,
  setIsEditItemModalOpen,
  setSelectedItem,
}: ItemProps) {
  const handleDeleteItem = () => {
    setItems((prevItems) => prevItems.filter((i) => i.id != item.id));
  };

  const handleEditItem = () => {
    setSelectedItem(item);
    setIsEditItemModalOpen(true);
  };

  return (
    <div className="item-card">
      <div className="item-info">
        <div className="item-title-container">
          <h2 className="item-title">{item.name}</h2>
          <div
            className="item-tag"
            style={{
              color: getCategoryTagTextColor(item.category as ItemCategoryEnum),
              backgroundColor: getCategoryTagBackgroundColor(
                item.category as ItemCategoryEnum
              ),
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
        <button className="edit-button" onClick={handleEditItem}>
          Edit
        </button>
        <button className="delete-button" onClick={handleDeleteItem}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
