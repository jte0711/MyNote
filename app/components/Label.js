import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

const Label = ({ color, text, textColor = colors.white }) => {
  return (
    <View style={[styles.label, { backgroundColor: color }]}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  label: {
    alignSelf: "flex-start",
    backgroundColor: "#849EFB",
    borderRadius: 15,
    flexDirection: "row",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5.5,
  },
  text: {},
});
