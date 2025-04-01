// CartScreen.tsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useCart } from "../CartContext";
import { CartItemType } from "../../types/type";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = () => {
  const { cartItems, updateQuantity, removeItem, fetchCartItems } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        await fetchCartItems();
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load cart items."
        );
      } finally {
        setLoading(false);
      }
    };
    loadCartItems();
  }, []);

  const handleQuantityChange = (id: number, change: number) =>
    updateQuantity(id, change);

  const renderItem = ({ item }: { item: CartItemType }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>
          ${item.price?.toFixed(2)} x {item.quantity}
        </Text>
        <Text style={styles.totalItem}>
          Total: ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
            <Ionicons name="remove-circle-outline" size={24} color="red" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
            <Ionicons name="add-circle-outline" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Ionicons name="trash-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.price ?? 0) * item.quantity,
        0
      ),
    [cartItems]
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: "Your Cart" }} />
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        extraData={cartItems}
      />
      <Text style={styles.total}>Total Amount: ${totalAmount.toFixed(2)}</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  cartItem: {
    flexDirection: "row",
    marginVertical: 8,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
  },
  image: { width: 80, height: 80, borderRadius: 12 },
  details: { marginLeft: 16, flex: 1 },
  title: { fontSize: 16, fontWeight: "bold" },
  price: { color: "#777" },
  totalItem: { color: "#333", fontWeight: "600" },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantity: { marginHorizontal: 8, fontSize: 16 },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "right",
  },
  error: { color: "red", fontSize: 16, textAlign: "center" },
});
