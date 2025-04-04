import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { ProductType } from "../types/type";
import { useRouter } from "expo-router";
import { useCart } from "../app/CartContext";

const { width } = Dimensions.get("window");
const cardWidth = width / 2 - 30;

const ProductItems = memo(({ item }: { item: ProductType }) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const scaleValue = new Animated.Value(1);
  const { addToCart, addToLiked, removeFromLiked, likedItems } = useCart();

  useEffect(() => {
    const isLiked = likedItems.some((likedItem) => likedItem.id === item.id);
    setLiked(isLiked);
  }, [likedItems, item.id]);

  const toggleLike = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    if (liked) {
      removeFromLiked(item.id);
    } else {
      addToLiked({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.images[0],
        quantity: 1,
      });
    }
    setLiked(!liked);
  };

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.images[0],
      quantity: 1,
    });
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleValue }] }]}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          style={styles.overlay}
        />

        <TouchableOpacity
          onPress={toggleLike}
          activeOpacity={0.7}
          style={styles.likeButton}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={22}
            color={liked ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.productinfo}>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={18} color="orange" />
            <Text style={styles.ratingtxt}>4.7</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
});

export default ProductItems;

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 220,
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  likeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  productinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingtxt: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray,
    marginLeft: 5,
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
