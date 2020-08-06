import React from "react";
import { StyleSheet, Text, View } from "react-native";

const WelcomeText = ({ text1, text2, style }) => {
  return (
    <View style={style}>
      <Text style={styles.text1}>{text1}</Text>
      <Text style={styles.text2}>{text2}</Text>
    </View>
  );
};

export default WelcomeText;

const styles = StyleSheet.create({
  text1: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 36,
    lineHeight: 42,
    color: "#000000",
  },
  text2: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 28,

    color: "#859494",
  },
});
