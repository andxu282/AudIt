import "./items.css";
import ItemCard from "./ItemCard";
import { Item } from "../../types";
import { Dispatch, SetStateAction } from "react";

type ItemsSectionProps = {
  setIsAddItemModalOpen: Dispatch<SetStateAction<boolean>>;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
};

function ItemsSection({
  setIsAddItemModalOpen,
  items,
  setItems,
}: ItemsSectionProps) {
  return (
    <div>
      <div className="items-bar">
        <h1 className="items-title">Your Items</h1>
        <button
          onClick={() => setIsAddItemModalOpen(true)}
          className="add-item-button"
        >
          + Add Item
        </button>
      </div>
      {items.map((item) => (
        <ItemCard item={item} setItems={setItems} />
      ))}
    </div>
  );
}

export default ItemsSection;
