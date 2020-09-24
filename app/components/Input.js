import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input({
  style,
  value = null,
  theRef = null,
  ...otherProps
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      {...otherProps}
      defaultValue={value}
      ref={theRef}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    marginTop: 15,
    fontSize: 18,
    paddingLeft: 20,
    borderStyle: "solid",
    borderColor: "#939F9F",
    borderWidth: 2,
    borderRadius: 15,
  },
});
