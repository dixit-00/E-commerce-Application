import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProductItems from "./ProductItems";
import { Colors } from "../constants/Colors";
import { ProductType } from "../types/type";

import React from "react";

type Props = {
  products: ProductType[];
};

const { width } = Dimensions.get("window");
const cardWidth = width / 2 - 30;
const ITEM_HEIGHT = 320; // Approximate height of each item including margins

const Details = (props: Props) => {
  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * Math.floor(index / 2),
    index,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>For you</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={props.products}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ index, item }) => <ProductItems item={item} />}
        getItemLayout={getItemLayout}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  categoryItem: {
    marginVertical: 12,
    gap: 12,
    alignItems: "center",
    marginLeft: 12,
  },
});
