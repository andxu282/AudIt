import "./items.css";
import ItemCard from "./ItemCard";
import { Dispatch, SetStateAction } from "react";
import { ItemSchema } from "../../generated";

type ItemsSectionProps = {
  setIsAddItemModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditItemModalOpen: Dispatch<SetStateAction<boolean>>;
  items: ItemSchema[];
  setItems: Dispatch<SetStateAction<ItemSchema[]>>;
  setSelectedItem: Dispatch<SetStateAction<ItemSchema | undefined>>;
};

function ItemsSection({
  setIsAddItemModalOpen,
  setIsEditItemModalOpen,
  items,
  setItems,
  setSelectedItem,
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
        <ItemCard
          item={item}
          setItems={setItems}
          setIsEditItemModalOpen={setIsEditItemModalOpen}
          setSelectedItem={setSelectedItem}
        />
      ))}
    </div>
  );
}

export default ItemsSection;
