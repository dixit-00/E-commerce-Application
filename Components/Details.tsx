import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProductItems from "./ProductItems";
import { Colors } from "../constants/Colors";
import { ProductType } from "../types/type";

import React from "react";

type Props = {
  products: ProductType[];
};

const Details = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>For you </Text>
        <TouchableOpacity>
          <Text>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={props.products}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 15,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ index, item }) => <ProductItems item={item} />}
      />
    </View>
  );
};

export default Details;

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
