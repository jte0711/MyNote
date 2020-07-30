import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Screen from "./app/components/Screen";
import Input from "./app/components/Input";
import AppButton from "./app/components/Button";

import colors from "./app/config/colors";

export default function App() {
  return (
    <Screen style={styles.screen}>
      <View>
        <View style={styles.title}>
          <Text style={styles.text1}>Hello,</Text>
          <Text style={styles.text2}>Sign up to get started</Text>
        </View>
        <View style={{ marginTop: 75 }}>
          <Input
            textContentType="name"
            keyboardType="default"
            placeholder="Full Name"
          ></Input>
          <Input
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder="Email"
          ></Input>
          <Input
            textContentType="password"
            secureTextEntry={true}
            keyboardType="default"
            placeholder="Password"
          ></Input>
          <Input
            textContentType="password"
            secureTextEntry={true}
            keyboardType="default"
            placeholder="Re-type Password"
          ></Input>
        </View>
        <View style={{ marginTop: 50 }}>
          <AppButton
            title="Register"
            onPress={() => console.log("Register pressed")}
          />
        </View>
      </View>

      <View style={{ marginVertical: 25, alignItems: "center" }}>
        <Text>
          I am a member. <Text style={{ color: colors.primary }}>Sign in</Text>
        </Text>
      </View>
    </Screen>
  );
}

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
  title: {
    marginTop: 80,
  },
  screen: {
    marginLeft: 15,
    marginRight: 15,
    display: "flex",
    justifyContent: "space-between",
  },
});
