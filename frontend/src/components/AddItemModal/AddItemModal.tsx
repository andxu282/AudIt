import "./additemmodal.css";
import { ItemCategory, ItemType, ItemSchema } from "../../generated";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ItemCategoryEnum, ItemTypeEnum } from "../../utils";
import { itemsApi } from "../../client";

type AddItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setItems: Dispatch<SetStateAction<ItemSchema[]>>;
};

function AddItemModal({ isOpen, onClose, setItems }: AddItemModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState(0);

  if (!isOpen) return null;

  const handleAddItem = () => {
    const newItem: ItemSchema = {
      id: crypto.randomUUID(),
      name: name,
      amount: amount,
      type: type as ItemType,
      category: category as ItemCategory,
      frequency: frequency,
    };
    itemsApi.createItem({
      name: name,
      amount: amount,
      type: type,
      category: category,
      frequency: frequency,
      user_id: "andxu282",
    });
    setItems((prevItems) => [...prevItems, newItem]);
    setName("");
    setAmount(0);
    setType("");
    setCategory("");
    setFrequency(0);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-item-modal" onClick={(e) => e.stopPropagation()}>
        <h1 className="add-item-modal-title">Add New Item</h1>
        <h3 className="add-item-modal-subtitle">
          Add a new expense item to track your spending.
        </h3>
        <h2 className="add-item-modal-field">Item Name</h2>
        <input
          className="add-item-modal-text-input"
          type="text"
          placeholder="e.g. Netflix"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h2 className="add-item-modal-field">Price</h2>
        <input
          className="add-item-modal-text-input"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <h2 className="add-item-modal-field">Type</h2>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Choose a type</option>
          {Object.values(ItemTypeEnum).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <h2 className="add-item-modal-field">Category</h2>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose a category</option>
          {Object.values(ItemCategoryEnum).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <h2 className="add-item-modal-field">Frequency</h2>
        <input
          className="add-item-modal-text-input"
          type="number"
          step="1"
          min="0"
          placeholder="0"
          value={frequency}
          onChange={(e) => setFrequency(parseInt(e.target.value))}
        />
        <div className="add-item-modal-buttons">
          <button className="add-item-modal-cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="add-item-modal-button" onClick={handleAddItem}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;
