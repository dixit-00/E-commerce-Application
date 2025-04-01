import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// Define category type
type Category = {
  id: number;
  name: string;
  image: string;
};

type ExploreScreenNavigation = {
  navigate: (screen: "CategoryDetails", params: { categoryId: number }) => void;
};

const ExploreScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const navigation = useNavigation<ExploreScreenNavigation>();

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Explore Categories</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.gray}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={styles.loader}
        />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() =>
                navigation.navigate("CategoryDetails", { categoryId: item.id })
              }
            >
              <Image
                source={{
                  uri: item.image || "https://via.placeholder.com/150",
                }}
                style={styles.categoryImage}
                resizeMode="cover"
              />
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.gray,
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  row: {
    justifyContent: "space-between",
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 5,
    flex: 1,
    alignItems: "center",
    padding: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: width / 2 - 15,
    height: height * 0.25,
  },
  categoryImage: {
    width: "100%",
    height: "75%",
    borderRadius: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
});
