import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import Input from "../components/Input";
// import apiClient from "../api/note";
import asyncNote from "../api/asyncNote";
import colors from "../config/colors";

const NoteScreen = ({ navigation, route }) => {
  const details = route ? route.params : null;
  const [titleHeight, setTitleHeight] = useState("auto");
  const [contentHeight, setContentHeight] = useState("auto");
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(details ? details.title : "");
  const [content, setContent] = useState(details ? details.content : "");

  const titleInputRef = useRef();
  const textInputRef = useRef();

  const deleteNote = async () => {
    let id = details ? details.id : null;
    if (id) {
      await asyncNote.deleteNote(parseInt(id));
      navigation.navigate("Home");
    } else {
      navigation.goBack();
    }
  };
  const saveIconHandler = async () => {
    setEdit(false);
    let response;
    let data = {
      title: title,
      content: content,
      labels: [], // try to find a way to give labels
    };
    titleInputRef.current.blur();
    textInputRef.current.blur();
    if (details) {
      // edit current note
      response = await asyncNote.editNote(data, details.id);
    } else {
      // add a new note
      response = await asyncNote.addNote(data);
    }

    if (response.status != "ok") {
      Alert.alert("Memory full, please delete a few notes to save this", null, [
        { text: "OK" },
      ]);
    }
  };
  const trashIconHandler = () => {
    setEdit(false);

    // ask confirmation
    Alert.alert("Are you sure you want to delete this?", null, [
      {
        text: "OK",
        onPress: deleteNote,
      },
      {
        text: "Cancel",
        onPress: () => {},
      },
    ]);
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
            onPress={trashIconHandler}
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
      <Text style={[{ display: "none" }, styles.date]}>
        Last edited 25 November 2019
      </Text>
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
      {/* <View style={{ marginTop: 50 }}>
        <Button
          title="Add list"
          color={colors.primary}
          onPress={() => {
            console.log("pressed");
          }}
        />
        <Button
          title="add image"
          color={colors.primary}
          onPress={() => {
            console.log("add image pressed");
          }}
        />
      </View> */}
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
