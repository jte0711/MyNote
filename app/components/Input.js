import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({ style, ...otherProps }) {
  return <TextInput style={[styles.input, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginTop: 15,
    fontSize: 16,
    paddingHorizontal: 15,
    backgroundColor: "#FBFEFE",
    borderStyle: "solid",
    borderColor: "#939F9F",
    borderWidth: 2,
    borderRadius: 15,
  },
});
