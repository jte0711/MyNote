import React, { useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";

import Label from "./Label";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import apiClient from "../api/note";
import asyncNote from "../api/asyncNote";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

const NoteCard = ({
  title,
  content,
  labels,
  pressFunction,
  id,
  handleRefresh,
}) => {
  useEffect(() => {
    console.log("this is card id ", id);
    console.log("thi sis card content", content);
  }, []);
  const deleteNote = async (noteId) => {
    console.log("this is note id ", noteId);
    if (noteId) {
      await asyncNote.deleteNote(parseInt(noteId));
      handleRefresh();
    } else {
      console.log("error triggered");
    }
  };
  const trashIconHandler = (noteId) => {
    // ask confirmation
    Alert.alert("Are you sure you want to delete this?", null, [
      {
        text: "OK",
        onPress: () => {
          deleteNote(noteId);
        },
      },
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel pressed");
        },
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={pressFunction}>
      <View style={styles.card}>
        <Swipeable
          renderRightActions={(progress, dragX) => {
            // const scale = dragX.interpolate({
            //   inputRange: [-100, 0],
            //   outputRange: [1, 0],
            //   extrapolate: "clamp",
            // });
            return (
              <View style={styles.rightAction}>
                <MaterialCommunityIcons
                  color={"#FBFEFE"}
                  style={[styles.icon]}
                  name="trash-can"
                  size={30}
                  onPress={() => trashIconHandler(id)}
                />
              </View>
            );
          }}
        >
          <View style={[styles.innerCard]}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {content}
            </Text>
            <View style={styles.labels}>
              <FlatList
                data={labels}
                horizontal={true}
                keyExtractor={(label) => label.id.toString()}
                renderItem={({ item }) => (
                  <Label text={item.text} color={item.color} />
                )}
              />
            </View>
          </View>
        </Swipeable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  description: {
    color: "#072120",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 14,
    lineHeight: 13,
    marginBottom: 10,
  },
  labels: {
    flexDirection: "row",
  },
  innerCard: {
    // ----- Fix later -----
    backgroundColor: "#FBFEFE",
    minHeight: 119,
    padding: 15,
    width: "100%",
    // ----- END -----
  },
  card: {
    borderRadius: 15,
    backgroundColor: "#FBFEFE",
    elevation: 3,
    marginVertical: 15,
    overflow: "hidden",
    shadowColor: "rgba(7, 33, 32, 0.3)",
    shadowRadius: 2.5,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 3,
      width: 0,
    },
  },
  rightAction: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "red",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    color: "#072120",
    fontFamily: "Roboto",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: 23,
    marginBottom: 10,
  },
});
