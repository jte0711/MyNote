import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screen";
import WelcomeText from "../components/WelcomeText";
import Input from "../components/Input";
import AppButton from "../components/Button";

import colors from "../config/colors";

const LoginScreen = ({ navigation }) => {
  return (
    <Screen style={styles.screen}>
      <View>
        <WelcomeText
          style={styles.title}
          text1="Welcome,"
          text2="Sign in to continue"
        />
        <View style={styles.formView}>
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
          <Text style={styles.forgotPass}>Forgot password</Text>
        </View>
        <View style={styles.buttonView}>
          <AppButton
            title="LOGIN"
            onPress={() => console.log("Login pressed")}
          />
          <AppButton
            color="#4885ED"
            iconName="google"
            title="Sign in with Google"
            onPress={() => console.log("Google Login pressed")}
          />
          <AppButton
            color="#3B5998"
            iconName="facebook"
            title="Sign in with Facebook"
            onPress={() => console.log("Facebook Login pressed")}
          />
        </View>
      </View>
      <View style={styles.bottomText}>
        <Text>
          Create an account?{" "}
          <Text
            style={{ color: colors.primary }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 40,
  },
  bottomText: {
    marginVertical: 25,
    alignItems: "center",
    fontSize: 18,
  },
  forgotPass: {
    margin: 5,
    color: "#072120",
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
