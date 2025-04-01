import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import ProductItems from "@/Components/ProductItems";
import { ProductType } from "../types/type";

type Props = {
  products: ProductType[];
};

const FlashSale = ({ products }: Props) => {
  const [timeLeft, setTimeLeft] = useState(7200); // Example: 2 hours

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>FLASH SALE</Text>
          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={20} color={Colors.black} />
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAllText}>SEE ALL</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItems item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default FlashSale;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.black,
    marginRight: 10,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginLeft: 6,
    fontSize: 16,
    color: Colors.black,
    fontWeight: "600",
  },
  seeAllText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "600",
  },
  listContainer: {
    paddingHorizontal: 12,
  },
});
