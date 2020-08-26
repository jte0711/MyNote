import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import Input from "../components/Input";
import apiClient from "../api/note";

const NoteScreen = ({ route }) => {
  const details = route ? route.params : null;
  const [titleHeight, setTitleHeight] = useState("auto");
  const [contentHeight, setContentHeight] = useState("auto");
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(details ? details.title : "");
  const [content, setContent] = useState(details ? details.content : "");

  const titleInputRef = useRef();
  const textInputRef = useRef();

  const saveIconHandler = () => {
    setEdit(false);
    let data = {
      title: title,
      content: content,
      labels: [], // try to find a way to give labels
    };
    titleInputRef.current.blur();
    textInputRef.current.blur();
    if (details) {
      // edit the current note
      apiClient.editNote(data, details.id);
      console.log("Edit current note");
      console.log("Data ", data);
      console.log("id ", details.id);
    } else {
      // add a new note
      apiClient.addNote(data);
      console.log("Add a new note");
      console.log(data);
    }
  };
  const inputBlurHandler = () => {
    setEdit(false);
  };
  const inputFocusHandler = () => {
    setEdit(true);
  };

  return (
    <Screen style={styles.screen}>
      {edit ? (
        <View style={styles.topBar}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="trash-can"
            size={30}
          />
          <MaterialCommunityIcons
            style={styles.icon}
            name="check-circle-outline"
            size={30}
            onPress={saveIconHandler}
          />
        </View>
      ) : null}
      <Input
        maxLength={70}
        multiline={true}
        numberOfLines={3}
        onChangeText={(text) => {
          setTitle(text);
        }}
        onContentSizeChange={(event) => {
          if (event && event.nativeEvent && event.nativeEvent.contentSize) {
            setTitleHeight(event.nativeEvent.contentSize.height);
          }
        }}
        onFocus={inputFocusHandler}
        placeholder="Type a title here"
        theRef={titleInputRef}
        style={[styles.titleInput, { height: titleHeight }]}
        value={details ? details.title : null}
      />
      <Text style={styles.date}>Last edited 25 November 2019</Text>
      <Input
        multiline
        onChangeText={(text) => {
          setContent(text);
        }}
        onContentSizeChange={(event) => {
          if (event && event.nativeEvent && event.nativeEvent.contentSize) {
            setContentHeight(event.nativeEvent.contentSize.height);
          }
        }}
        onFocus={inputFocusHandler}
        placeholder="Type something here"
        theRef={textInputRef}
        style={[styles.content, { height: contentHeight }]}
        value={details ? details.content : null}
      />
    </Screen>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  content: {
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
  icon: {
    paddingLeft: 20,
  },
  screen: {
    padding: 5,
  },
  titleInput: {
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
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    justifyContent: "flex-end",
    paddingRight: 15,
    width: "100%",
  },
});
