import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useCart } from "../app/CartContext";

const LikeProduct = () => {
  const { likedItems, removeFromLiked } = useCart();

  const handleRemove = (id: number) => {
    removeFromLiked(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liked Products</Text>
      {likedItems.length > 0 ? (
        <FlatList
          data={likedItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRemove(item.id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No liked products yet.</Text>
      )}
    </View>
  );
};

export default LikeProduct;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  image: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  details: { flex: 1 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  price: { fontSize: 14, color: "green" },
  removeButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
