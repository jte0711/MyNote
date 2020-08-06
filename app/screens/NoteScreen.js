import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import Input from "../components/Input";

const NoteScreen = () => {
  const [titleHeight, setTitleHeight] = useState("auto");
  const [contentHeight, setContentHeight] = useState("auto");

  return (
    <Screen style={styles.screen}>
      <Input
        maxLength={70}
        multiline={true}
        numberOfLines={3}
        onContentSizeChange={(event) => {
          if (event && event.nativeEvent && event.nativeEvent.contentSize) {
            setTitleHeight(event.nativeEvent.contentSize.height);
          }
        }}
        placeholder="Type a title here"
        style={[styles.titleInput, { height: titleHeight }]}
      />
      <Text style={styles.date}>Last edited 25 November 2019</Text>
      <Input
        multiline
        onContentSizeChange={(event) => {
          if (event && event.nativeEvent && event.nativeEvent.contentSize) {
            setContentHeight(event.nativeEvent.contentSize.height);
          }
        }}
        placeholder="Type something here"
        style={[styles.content, { height: contentHeight }]}
      />
    </Screen>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    borderWidth: 0,
    color: "#122120",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.005,
    paddingRight: 20,
  },
  date: {
    color: "#94B8B5",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 13,
    lineHeight: 15,
    marginVertical: 10,
    paddingHorizontal: 25,
  },
  screen: {
    padding: 5,
  },
  titleInput: {
    backgroundColor: "white",
    borderWidth: 0,
    color: "#072120",
    fontSize: 36,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    lineHeight: 42,
    paddingRight: 15,
    width: "100%",
  },
});
