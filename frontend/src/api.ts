import { ItemCreate, ItemSchema } from "./generated";

const API_BASE_URL = "http://127.0.0.1:5000/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    throw new Error(
      errorData.error || `HTTP ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

export const itemsApi = {
  async getItems(): Promise<ItemSchema[]> {
    const response = await fetch(`${API_BASE_URL}/items`);
    return handleResponse<ItemSchema[]>(response);
  },

  async createItem(item: ItemCreate): Promise<ItemSchema> {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    return handleResponse<ItemSchema>(response);
  },
};
