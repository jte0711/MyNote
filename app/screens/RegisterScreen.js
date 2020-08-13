import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import Input from "../components/Input";
import AppButton from "../components/Button";
import WelcomeText from "../components/WelcomeText";

import colors from "../config/colors";

export default function RegisterScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View>
        <WelcomeText
          style={styles.title}
          text1="Hello,"
          text2="Sign up to get started"
        />
        <View style={styles.formView}>
          <Input
            textContentType="name"
            keyboardType="default"
            placeholder="Full Name"
            style={{ backgroundColor: colors.white }}
          ></Input>
          <Input
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder="Email"
            style={{ backgroundColor: colors.white }}
          ></Input>
          <Input
            textContentType="password"
            secureTextEntry={true}
            keyboardType="default"
            placeholder="Password"
            style={{ backgroundColor: colors.white }}
          ></Input>
          <Input
            textContentType="password"
            secureTextEntry={true}
            keyboardType="default"
            placeholder="Re-type Password"
            style={{ backgroundColor: colors.white }}
          ></Input>
        </View>
        <View style={styles.buttonView}>
          <AppButton
            title="REGISTER"
            onPress={() => console.log("Register pressed")}
          />
        </View>
      </View>

      <View style={styles.bottomText}>
        <Text>
          I am a member.{" "}
          <Text
            style={{ color: colors.primary }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 50,
  },
  bottomText: {
    marginVertical: 25,
    alignItems: "center",
    fontSize: 18,
  },
  formView: {
    marginTop: 75,
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
