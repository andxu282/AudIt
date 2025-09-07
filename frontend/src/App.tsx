import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import DashboardTitle from "./components/DashboardTitle/DashboardTitle";
import MonthlySpendCard from "./components/MonthlySpendCard/MontlySpendCard";
import SpendBreakdownCard from "./components/SpendBreakdownCard/SpendBreakdownCard";
import ItemsSection from "./components/Item/ItemsSection";
import AddItemModal from "./components/AddItemModal/AddItemModal";
import { useState, useEffect } from "react";
import EditItemModal from "./components/EditItemModal/EditItemModal";
import { ItemCategoryEnum, ItemTypeEnum } from "./utils";
import { ItemSchema } from "./generated";
import { itemsApi } from "./client";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState<
    ItemSchema | undefined
  >(undefined);
  const [items, setItems] = useState<ItemSchema[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setIsLoading(true);
        const fetchedItems = await itemsApi.getItems("andxu282");
        const processedItems = fetchedItems.map((apiItem) => {
          return {
            id: apiItem.id,
            name: apiItem.name,
            amount: apiItem.amount,
            type: apiItem.type as ItemTypeEnum,
            category: apiItem.category as ItemCategoryEnum,
            frequency: apiItem.frequency,
          };
        });
        setItems(processedItems);
        setError(null);
      } catch (err) {
        setError("Failed to load items");
      } finally {
        setIsLoading(false);
      }
    };
  });

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
