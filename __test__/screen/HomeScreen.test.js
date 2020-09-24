import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";

import AppNavigator from "../../app/navigation/AppNavigator";

const app = (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

describe("Testing home screen", () => {
  test("Home screen shown with all components (Note, CardList, Button)", async () => {
    const { getByText, getByTestId } = render(app);

    await waitFor(() => {
      const note = getByText("Notes");
      const noteList = getByTestId("noteList");
      const addButton = getByTestId("AddButton");
      expect(note).toBeTruthy();
      expect(noteList).toBeTruthy();
      expect(addButton).toBeTruthy();
    });
  });

  test("Clicking add button will navigate the screen to NoteScreen with empty title and content", async () => {
    const { getByPlaceholderText, getByTestId } = render(app);

    act(() => {
      fireEvent.press(getByTestId("AddButton"));
    });

    await waitFor(() => {
      const title = getByPlaceholderText("Type a title here");
      const content = getByPlaceholderText("Type something here");

      expect(title).toBeTruthy();
      expect(content).toBeTruthy();
      expect(title.props.defaultValue).toBe(null);
      expect(content.props.defaultValue).toBe(null);
    });
  });

  describe("Testing HomeScreen -> NoteCard", () => {
    test("Given a note data, it will show a note card", async () => {
      const { update, getByText, getByPlaceholderText, getByTestId } = render(
        app
      );

      act(() => {
        update(app);
      });
      await waitFor(() => {
        // const note = getByText("Hello bro");
        const noteCard = getByTestId("cardTitle");

        expect(noteCard).toBeTruthy();
        expect(note).toBeTruthy();
      });
    });
    test("Given a note card, if it is clicked it will navigate to NoteScreen with correct details", () => {});
    test("Given a note card, if user slide left, then it will show a delete button", () => {});
    test("Given a slided notecard, if user click delete icon/red background, then it will delete the note card", () => {});
  });
});
