import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "@react-navigation/native";

type Props = {
  onPress: () => void; // Fixed incorrect function type
  onLongPress: () => void; // Fixed incorrect function type
  isFocused: boolean;
  label: string;
  routeName: string; // Added routeName prop
};

const TabBarButton: React.FC<Props> = ({
  onPress,
  onLongPress,
  isFocused,
  label,
}) => {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={{ flex: 1 }}>
      <Text style={{ color: isFocused ? colors.primary : colors.text }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBarButton;
