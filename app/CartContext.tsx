import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItemType } from "../types/type";

interface CartContextType {
  cartItems: CartItemType[];
  likedItems: CartItemType[];
  addToCart: (product: CartItemType) => void;
  addToLiked: (product: CartItemType) => void;
  updateQuantity: (id: number, change: number) => void;
  removeFromLiked: (id: number) => void;
  removeItem: (id: number) => void;
  fetchCartItems: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [likedItems, setLikedItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:8000/cart");
      if (!response.ok) throw new Error("Failed to fetch cart items");
      const data: CartItemType[] = await response.json();

      const uniqueData = Array.from(
        new Map(data.map((item) => [item.id, item])).values()
      );
      setCartItems(uniqueData);
      await AsyncStorage.setItem("cartItems", JSON.stringify(uniqueData));
    } catch (error) {
      const storedItems = await AsyncStorage.getItem("cartItems");
      if (storedItems) setCartItems(JSON.parse(storedItems));
      console.error(error);
    }
  };

  const syncStorage = async (items: CartItemType[], key: string) => {
    await AsyncStorage.setItem(key, JSON.stringify(items));
  };

  const addToCart = async (product: CartItemType) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      const updatedItems = existingItem
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];

      syncStorage(updatedItems, "cartItems");
      return updatedItems;
    });

    try {
      await fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const addToLiked = async (product: CartItemType) => {
    setLikedItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      const updatedItems = existingItem ? prev : [...prev, { ...product }];
      syncStorage(updatedItems, "likedItems");
      return updatedItems;
    });
  };

  const removeFromLiked = async (id: number) => {
    setLikedItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      syncStorage(updatedItems, "likedItems");
      return updatedItems;
    });
  };

  const updateQuantity = async (id: number, change: number) => {
    setCartItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );
      syncStorage(updatedItems, "cartItems");
      return updatedItems;
    });

    try {
      const updatedItem = cartItems.find((item) => item.id === id);
      if (updatedItem) {
        await fetch(`http://localhost:8000/cart/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: updatedItem.quantity }),
        });
      }
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    }
  };

  const removeItem = async (id: number) => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      syncStorage(updatedItems, "cartItems");
      return updatedItems;
    });

    try {
      await fetch(`http://localhost:8000/cart/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const contextValue = useMemo(
    () => ({
      cartItems,
      likedItems,
      addToCart,
      addToLiked,
      updateQuantity,
      removeItem,
      fetchCartItems,
      removeFromLiked,
    }),
    [cartItems, likedItems, removeFromLiked]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider };
