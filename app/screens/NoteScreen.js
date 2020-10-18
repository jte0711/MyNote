import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import Input from "../components/Input";
// import apiClient from "../api/note";
import asyncNote from "../api/asyncNote";
import colors from "../config/colors";
import { FlatList } from "react-native-gesture-handler";
import { contextType } from "lottie-react-native";

const NoteScreen = ({ navigation, route }) => {
  const details = route ? route.params : null;
  const [titleHeight, setTitleHeight] = useState("auto");
  const [contentHeight, setContentHeight] = useState({ 0: "auto", 1: "auto" });
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(details ? details.title : "");
  // const [content, setContent] = useState(details ? details.content : "");
  const [autoFocus, setAutoFocus] = useState(false);
  const [contentList, setContentList] = useState([0, 1]); // put in index number in the list
  const [contentTexts, setContentTexts] = useState({
    0: "testing one two three",
    1: "testing everything",
  }); // index: list of string value
  const refDict = useRef([]);

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
  // useEffect(() => {
  //   // console.log(contentTexts);
  // }, [contentTexts]);

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
      {/* <Input
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
      /> */}

      <FlatList
        data={contentList}
        keyExtractor={(index) => {
          return index.toString();
        }}
        renderItem={({ item, index }) => {
          return (
            <Input
              autoFocus={autoFocus}
              theRef={(element) => {
                refDict.current[item] = element;
              }}
              multiline
              onContentSizeChange={(event) => {
                if (
                  event &&
                  event.nativeEvent &&
                  event.nativeEvent.contentSize
                ) {
                  let temp = {};
                  temp[item] = event.nativeEvent.contentSize.height;
                  setContentHeight(Object.assign({}, contentHeight, temp));
                }
              }}
              onFocus={inputFocusHandler}
              onKeyPress={(e) => {
                console.log(e.nativeEvent.key);
                if (
                  contentTexts[item] === "" &&
                  e.nativeEvent.key === "Backspace"
                ) {
                  console.log("backspace true");
                  // delete textinput here
                  refDict.current[item] = null;

                  let temp = contentTexts;
                  let tempArr = contentList;

                  delete temp[item];
                  tempArr.splice(index, 1);

                  setContentTexts(Object.assign({}, temp));
                  setContentList(tempArr);

                  refDict.current[contentList[index - 1]].focus();
                }
              }}
              style={[
                styles.content,
                {
                  height: contentHeight[item],
                  backgroundColor: "yellow",
                  marginVertical: 0,
                },
              ]}
              onChangeText={(text) => {
                console.log("changetext");
                let temp = {};
                temp[item] = text;
                setContentTexts(Object.assign({}, contentTexts, temp));
              }}
              blurOnSubmit={true}
              returnKeyType={"go"}
              onSubmitEditing={() => {
                let newIdx = Math.max(...contentList) + 1;
                let temp = {};
                temp[newIdx] = "";
                let tempList = contentList;
                tempList.splice(index + 1, 0, newIdx);

                refDict.current[item].blur();
                setAutoFocus(true);
                setContentTexts(Object.assign({}, contentTexts, temp));
                setContentList(tempList);
              }}
              value={contentTexts[item]}
            />
          );
        }}
      ></FlatList>
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
