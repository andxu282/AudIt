import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import DashboardTitle from "./components/DashboardTitle/DashboardTitle";
import MonthlySpendCard from "./components/MonthlySpendCard/MontlySpendCard";
import SpendBreakdownCard from "./components/SpendBreakdownCard/SpendBreakdownCard";
import ItemsSection from "./components/Item/ItemsSection";
import AddItemModal from "./components/AddItemModal/AddItemModal";
import { useState } from "react";
import EditItemModal from "./components/EditItemModal/EditItemModal";
import { ItemCategoryEnum, ItemTypeEnum } from "./utils";
import { ItemSchema } from "./generated";

function App() {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState<
    ItemSchema | undefined
  >(undefined);
  const netflix: ItemSchema = {
    id: crypto.randomUUID(),
    name: "Netflix",
    amount: 7.99,
    frequency: 1,
    type: ItemTypeEnum.SUBSCRIPTION,
    category: ItemCategoryEnum.MONTHLY,
  };
  const shampoo: ItemSchema = {
    id: crypto.randomUUID(),
    name: "Shampoo",
    amount: 14.99,
    frequency: 3,
    type: ItemTypeEnum.ITEM,
    category: ItemCategoryEnum.DAILY_NEEDS,
  };
  const chase: ItemSchema = {
    id: crypto.randomUUID(),
    name: "Chase Sapphire Preferred",
    amount: 99.99,
    frequency: 12,
    type: ItemTypeEnum.SUBSCRIPTION,
    category: ItemCategoryEnum.YEARLY,
  };
  const [items, setItems] = useState<ItemSchema[]>([netflix, shampoo, chase]);

  // Computations
  const totalAmount = items.reduce(
    (sum, item) => sum + item.amount / item.frequency,
    0
  );
  const subscriptionsAmount = items.reduce((sum, item) => {
    if (item.type === ItemTypeEnum.SUBSCRIPTION) {
      return sum + item.amount / item.frequency;
    }
    return sum;
  }, 0);
  const itemsAmount = items.reduce((sum, item) => {
    if (item.type === ItemTypeEnum.ITEM) {
      return sum + item.amount / item.frequency;
    }
    return sum;
  }, 0);
  const dailyNeedsAmount = items.reduce((sum, item) => {
    if (item.category === ItemCategoryEnum.DAILY_NEEDS) {
      // divide by frequency
      return sum + item.amount / item.frequency;
    }
    return sum;
  }, 0);
  const numDailyNeedsItems = items.reduce((sum, item) => {
    if (item.category === ItemCategoryEnum.DAILY_NEEDS) {
      sum++;
    }
    return sum;
  }, 0);
  const monthlyAmount = items.reduce((sum, item) => {
    if (item.category === ItemCategoryEnum.MONTHLY) {
      // no need to divide, already monthly
      return sum + item.amount;
    }
    return sum;
  }, 0);
  const numMonthlyItems = items.reduce((sum, item) => {
    if (item.category === ItemCategoryEnum.MONTHLY) {
      sum++;
    }
    return sum;
  }, 0);
  const yearlyAmount = items.reduce((sum, item) => {
    if (item.category === ItemCategoryEnum.YEARLY) {
      // divide by 12 to average across months
      return sum + item.amount / 12;
    }
    return sum;
  }, 0);
  const numYearlyItems = items.reduce((sum, item) => {
    if (item.category === ItemCategoryEnum.YEARLY) {
      // divide by 12 to average across months
      sum++;
    }
    return sum;
  }, 0);

  return (
    <div>
      <NavigationBar />
      <div className="body">
        <div className="dashboard-title-container">
          <DashboardTitle />
        </div>
        <div className="spend-section">
          <MonthlySpendCard
            totalAmount={totalAmount}
            subscriptionsAmount={subscriptionsAmount}
            itemsAmount={itemsAmount}
            numItems={items.length}
          />
          <SpendBreakdownCard
            totalAmount={totalAmount}
            dailyNeedsAmount={dailyNeedsAmount}
            numDailyNeedsItems={numDailyNeedsItems}
            monthlyAmount={monthlyAmount}
            numMonthlyItems={numMonthlyItems}
            yearlyAmount={yearlyAmount}
            numYearlyItems={numYearlyItems}
          />
        </div>
        <ItemsSection
          setIsAddItemModalOpen={setIsAddItemModalOpen}
          setIsEditItemModalOpen={setIsEditItemModalOpen}
          items={items}
          setItems={setItems}
          setSelectedItem={setSelectedEditItem}
        />
      </div>
      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => {
          setIsAddItemModalOpen(false);
        }}
        setItems={setItems}
      />
      <EditItemModal
        selectedItem={selectedEditItem}
        isOpen={isEditItemModalOpen}
        onClose={() => {
          setIsEditItemModalOpen(false);
        }}
        setItems={setItems}
      />
    </div>
  );
}

export default App;
