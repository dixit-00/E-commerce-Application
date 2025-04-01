import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { CategoryType } from "@/types/type";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";

type Props = { categories: CategoryType[] };

const Catergories = (catorgories: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.title}>Catorgories</Text>
        <TouchableOpacity>
          <Text>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={catorgories.categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Catergories;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
