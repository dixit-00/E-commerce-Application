import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { CategoryType } from "@/types/type";

type Props = { categories: CategoryType[] };

const Categories = ({ categories }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CATEGORIES</Text>
        <TouchableOpacity activeOpacity={0.6}>
          <Text style={styles.seeAll}>SEE ALL</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem} activeOpacity={0.7}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.categoryName}>{item.name.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 15,
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFF",
  },
  seeAll: {
    fontSize: 14,
    color: "#FF3D00",
    fontWeight: "800",
  },
  listContainer: {
    paddingVertical: 10,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#FF3D00",
  },
  categoryName: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FFF",
  },
});
