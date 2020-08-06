import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({ style, ...otherProps }) {
  return <TextInput style={[styles.input, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginTop: 15,
    fontSize: 18,
    paddingLeft: 20,
    backgroundColor: "#FBFEFE",
    borderStyle: "solid",
    borderColor: "#939F9F",
    borderWidth: 2,
    borderRadius: 15,
  },
});
