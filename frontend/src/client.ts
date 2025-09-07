export interface ApiItem {
  id: string;
  name: string;
  amount: number;
  type: string;
  category: string;
  frequency: number;
  created_at: string;
  user_id: string;
}

export interface CreateItemRequest {
  name: string;
  amount: number;
  type: string;
  category: string;
  frequency: number;
  user_id: string;
}

export interface UpdateItemRequest {
  name?: string;
  amount?: number;
  type?: string;
  category?: string;
  frequency?: string;
}

const API_BASE_URL = "http://localhost:5173/api";

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
  async getItems(userId: string): Promise<ApiItem[]> {
    const response = await fetch(`${API_BASE_URL}/items?user_id=${userId}`);
    return handleResponse<ApiItem[]>(response);
  },

  async createItem(item: CreateItemRequest): Promise<ApiItem> {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    return handleResponse<ApiItem>(response);
  },

  async updateItem(
    itemId: string,
    updates: UpdateItemRequest
  ): Promise<ApiItem> {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return handleResponse<ApiItem>(response);
  },

  async deleteItem(itemId: String): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
      method: "DELETE",
    });
    await handleResponse<{ message: string }>(response);
  },
};
