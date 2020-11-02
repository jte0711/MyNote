import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import Input from "../components/Input";
// import apiClient from "../api/note";
import asyncNote from "../api/asyncNote";
import colors from "../config/colors";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
// import {
//   actions,
//   RichEditor,
//   RichToolbar,
// } from "../components/react-native-rich-editor/src/index";

const NoteScreen = ({ navigation, route }) => {
  const details = route ? route.params : null;
  const [titleHeight, setTitleHeight] = useState("auto");
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(details ? details.title : "");
  const [content, setContent] = useState(details ? details.content : "");
  const [keyboardState, setKeyboardState] = useState(false);
  const [linkPrompt, setLinkPrompt] = useState(false);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkURL, setLinkURL] = useState("");

  const titleInputRef = useRef();
  const textInputRef = useRef();
  const scrollRef = useRef();

  const handleInsertLink = () => {
    setLinkPrompt(true);
  };

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
    textInputRef.current.blurContentEditor();
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

  useEffect(() => {
    textInputRef.current.setContentFocusHandler(inputFocusHandler);
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardState(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardState(false);
    });

    return () => {
      Keyboard.removeListener("keyboardDidShow", () => {
        setKeyboardState(true);
      });
      Keyboard.removeListener("keyboardDidHide", () => {
        setKeyboardState(false);
      });
    };
  }, []);

  return (
    <>
      <Modal
        animationType={"none"}
        transparent={true}
        style={{ justifyContent: "center", alignItems: "center" }}
        visible={linkPrompt}
      >
        <View style={styles.linkPromptWrapper}>
          <View style={styles.linkPrompt}>
            <View style={{ paddingBottom: 25 }}>
              <Text>Please write the title below</Text>
              <TextInput
                onChangeText={(text) => setLinkTitle(text)}
                style={styles.linkPromptTextInput}
              ></TextInput>
              <Text>Please write the URL below</Text>
              <TextInput
                onChangeText={(text) => setLinkURL(text)}
                style={styles.linkPromptTextInput}
              ></TextInput>
            </View>
            <View style={styles.linkPromptButtonView}>
              <View style={styles.linkPromptButtonWrapper}>
                <TouchableOpacity
                  style={styles.linkPromptButton}
                  onPress={() => {
                    textInputRef.current.insertLink(linkTitle, linkURL);
                    setLinkTitle("");
                    setLinkURL("");
                    setLinkPrompt(false);
                  }}
                >
                  <Text>OK</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.linkPromptButtonWrapper}>
                <TouchableOpacity
                  style={styles.linkPromptButton}
                  onPress={() => {
                    // textInputRef.insertLink()
                    setLinkPrompt(false);
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"height"}
          keyboardVerticalOffset={150}
        >
          <ScrollView>
            <Input
              maxLength={70}
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) => {
                setTitle(text);
              }}
              onContentSizeChange={(event) => {
                if (
                  event &&
                  event.nativeEvent &&
                  event.nativeEvent.contentSize
                ) {
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
            <RichEditor
              editorStyle={{
                backgroundColor: colors.light,
                color: "#122120",
                contentCSSText:
                  'font-family: "Roboto"; font-style: "normal"; font-weight: "normal"; font-size: 18px; line-height: 25px; letter-spacing: 0.005px',
              }}
              style={[styles.content]}
              ref={textInputRef}
              placeholder={"Type something here"}
              onChange={(e) => {
                setContent(e);
              }}
              initialContentHTML={details ? details.content : null} //if there is initial value
            />
            {keyboardState ? <View style={{ height: 150 }} /> : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
      {edit ? (
        <RichToolbar
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
          ]}
          onInsertLink={handleInsertLink}
          editor={textInputRef}
          style={{ backgroundColor: colors.light }}
        />
      ) : null}
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  content: {
    borderWidth: 0,
    paddingTop: 10,
    paddingHorizontal: 15,
    width: "100%",
    flex: 1,
    maxHeight: "100%",
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
    color: "black",
  },
  linkPrompt: {
    backgroundColor: "white",
    width: "80%",
    height: 200,
    borderRadius: 25,
    padding: 15,
  },
  linkPromptButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: 100,
    height: 50,
    borderRadius: 20,
  },
  linkPromptButtonView: {
    flexDirection: "row",
    width: "100%",
  },
  linkPromptButtonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linkPromptTextInput: {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  linkPromptWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
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
