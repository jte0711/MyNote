import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

const AddButton = ({
  color = colors.primary,
  iconName = null,
  iconColor = colors.white,
  iconSize = 24,
  onPress = null,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={iconName}
        color={iconColor}
        size={iconSize}
      />
    </TouchableOpacity>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: 70,
    height: 70,
    right: 0,
    bottom: 20,
    borderRadius: 35,
  },
  icon: {
    paddingTop: 3,
    alignSelf: "center",
  },
});
