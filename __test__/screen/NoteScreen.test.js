import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import AppNavigator from "../../app/navigation/AppNavigator";
import NoteScreen from "../../app/screens/NoteScreen";

const app = <NoteScreen />;

describe("Testing Note Screen", () => {
  test("Delete and Save Icon show up, when title or content focused", () => {});
  test("Clicking delete, return to homescreen and delete the notecard", () => {});
  test("Clicking save, will blur all textinput and save the data to storage", () => {});
});
