import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = colors.primary,
  iconName = false,
  iconColor = colors.white,
  iconSize = 50,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      {iconName ? (
        <FontAwesome
          style={styles.icon}
          name={iconName}
          color={iconColor}
          size={iconSize * 0.5}
        />
      ) : null}

      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    height: 50,
    marginVertical: 5,
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 15,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AppButton;
