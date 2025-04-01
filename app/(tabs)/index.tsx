import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import Header from "../../Components/Header";
import { Colors } from "../../constants/Colors";
import ProductItems from "@/Components/ProductItems";
import { CategoryType, ProductType } from "../../types/type";
import Details from "@/Components/Details";
import Catergories from "@/Components/Catergories";
import FlashSale from "@/Components/FlashSale";

// Define ProductType to match API response

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [catorgories, setcatorgories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [flashsale, setFlashsale] = useState<ProductType[]>([]);

  useEffect(() => {
    getCatorgories();
    getProducts();
    getFlashsale();
  }, []);

  const getProducts = async () => {
    try {
      const URL = "http://127.0.0.1:8000/products"; // Using 127.0.0.1 instead of localhost
      const response = await axios.get(URL);
      // console.log("Products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };
  const getCatorgories = async () => {
    try {
      const URL = "http://127.0.0.1:8000/categories"; // Using 127.0.0.1 instead of localhost
      const response = await axios.get(URL);

      setcatorgories(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };
  const getFlashsale = async () => {
    try {
      const URL = "http://127.0.0.1:8000/saleProducts"; // Using 127.0.0.1 instead of localhost
      const response = await axios.get(URL);

      setFlashsale(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Ensure loading state is updated
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <Header /> }} />
      <Catergories categories={catorgories} />
      <Details products={products} />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
});
