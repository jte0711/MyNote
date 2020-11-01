import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
} from "react-native";
import colors from "../config/colors";

function Screen({ children, style }) {
  return (
    <>
      <StatusBar backgroundColor={colors.light} barStyle={"dark-content"} />
      <View style={[styles.screen, style]}>
        <View style={[styles.view, style]}>{children}</View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.light,
    color: "black",
    // backgroundColor: "black",
  },
  view: {
    flex: 1,
  },
});

export default Screen;
