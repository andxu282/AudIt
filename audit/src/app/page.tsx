import { Expense } from "./types";

export default function Home() {
  const rent: Expense = {
    id: "1",
    name: "Rent",
    description: "Rent for the month",
    price: 1000,
    category: "Housing",
    frequency: 1,
    type: "item",
  }

  const expenses: Expense[] = [rent];

  return (
    <div>
      <main>
        <h1>AudIt</h1>
        {/* Interface to add items*/}
        <h2>Add an item</h2>
        {/* Section to display items (dynamic) */}
        <h2>Items</h2>
        <div className="flex items-center justify-between border-b pb-4">
          <p>Name</p>
          <p>Description</p>
          <p>Price</p>
          <p>Category</p>
          <p>Frequency</p>
          <p>Type</p>
        </div>
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="mb-2 w-full rounded-md p-4"
          >
            <div className="flex items-center justify-between border-b pb-4">
              <p>{expense.name}</p>
              <p>{expense.description}</p>
              <p>{expense.price}</p>
              <p>{expense.category}</p>
              <p>{expense.frequency}</p>
              <p>{expense.type}</p>
            </div>
          </div>
        ))}
        {/* Compute total monthly cost */}
        <h2>Total monthly cost</h2>
      </main>
    </div>
  );
}
