import React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar as PaperSearchbar, useTheme } from "react-native-paper";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: object;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <PaperSearchbar
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={styles.searchbar}
        iconColor={theme.colors.secondary} // Yellow color from theme
        clearIcon="close-circle"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  searchbar: {
    elevation: 2,
    borderRadius: 8,
  },
});
