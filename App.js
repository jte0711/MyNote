import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./app/screens/HomeScreen";
import NoteScreen from "./app/screens/NoteScreen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";

const user = true;

export default function App() {
  // return <NoteScreen></NoteScreen>;
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
