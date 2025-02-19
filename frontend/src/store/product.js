import { create } from "zustand";

// Create a Zustand store for managing product data
export const useProductStore = create((set) => ({
  // State: List of products
  products: [],

  // Setter function to update the products list
  setProduct: (products) => set({ products }),

  // Function to create a new product
  createProduct: async (newProduct) => {
    // Validate that all required fields are provided
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    // Send a POST request to create the product
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();

    // Update the state with the newly created product
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully." };
  },

  // Function to fetch all products from the API
  fetchProducts: async () => {
    const res = await fetch("api/products");
    const data = await res.json();

    // Update the state with the fetched products
    set({ products: data.data });
  },

  // Function to delete a product by its ID
  deleteProduct: async (pid) => {
    const res = await fetch(`api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    // Immediately update the UI by removing the deleted product
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  // Function to update an existing product
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    // Immediately update the UI by replacing the updated product in the list
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return { success: true, message: data.message };
  },
}));
