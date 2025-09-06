import "./edititemmodal.css";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ItemCategoryEnum, ItemTypeEnum } from "../../utils";
import { ItemSchema } from "../../generated";

type EditItemModalProps = {
  selectedItem?: ItemSchema;
  isOpen: boolean;
  onClose: () => void;
  setItems: Dispatch<SetStateAction<ItemSchema[]>>;
};

function EditItemModal({
  selectedItem,
  isOpen,
  onClose,
  setItems,
}: EditItemModalProps) {
  if (!isOpen || selectedItem == undefined) {
    return null;
  }
  const [name, setName] = useState(selectedItem.name);
  const [amount, setAmount] = useState(selectedItem.amount);
  const [type, setType] = useState<string>(selectedItem.type);
  const [category, setCategory] = useState<string>(selectedItem.category);
  const [frequency, setFrequency] = useState(selectedItem.frequency);

  const handleEditItem = () => {
    const updatedItem: ItemSchema = {
      id: selectedItem.id,
      name: name,
      amount: amount,
      type: type as ItemTypeEnum,
      category: category as ItemCategoryEnum,
      frequency: frequency,
    };

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="add-item-modal" onClick={(e) => e.stopPropagation()}>
        <h1 className="add-item-modal-title">Edit Item</h1>
        <h3 className="add-item-modal-subtitle">
          Update your expense item details
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
          <button className="add-item-modal-button" onClick={handleEditItem}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditItemModal;
