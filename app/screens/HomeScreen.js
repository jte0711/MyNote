import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import NoteCard from "../components/NoteCard";

const noteList = [
  {
    id: 1,
    title: "Notes Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitaenunc at velit sodales vehicula sed sed elit.",
    labels: [
      { id: 1, text: "Urgent", color: "#F53D3D" },
      { id: 2, text: "Productivity", color: "#849EFB" },
    ],
  },
  {
    id: 2,
    title: "Long Description",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae nunc at velit sodales vehicula sed sed elit. and then add",
    labels: [
      { id: 1, text: "Urgent", color: "#F53D3D" },
      { id: 2, text: "Productivity", color: "#849EFB" },
    ],
  },
  {
    id: 3,
    title: "Overly Long Notes Title That Took Everything",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae nunc at velit sodales vehicula sed sed elit. ",
    labels: [
      { id: 1, text: "Urgent", color: "#F53D3D" },
      { id: 2, text: "Productivity", color: "#849EFB" },
    ],
  },
  {
    id: 4,
    title:
      "Overly Long Notes Title That Took Everything Wayyyyy too long to read please cut it off mate",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae nunc at velit sodales vehicula sed sed elit. ",
    labels: [
      { id: 1, text: "Urgent", color: "#F53D3D" },
      { id: 2, text: "Productivity", color: "#849EFB" },
    ],
  },
  {
    id: 5,
    title: "I don't know what to write anymore",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae nunc at velit sodales vehicula sed sed elit. ",
    labels: [
      { id: 1, text: "Urgent", color: "#F53D3D" },
      { id: 2, text: "Productivity", color: "#849EFB" },
    ],
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <Screen style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Notes</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            style={styles.icon}
            name="sort"
            color="black"
            size={30}
          />
          <MaterialIcons
            style={styles.icon}
            name="search"
            color="black"
            size={30}
          />
          <MaterialIcons
            style={styles.icon}
            name="settings"
            color="black"
            size={30}
          />
        </View>
      </View>
      <View style={styles.noteList}>
        <FlatList
          data={noteList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NoteCard
              content={item.content}
              title={item.title}
              labels={item.labels}
              pressFunction={() => {
                navigation.navigate("Note", item);
              }}
            />
          )}
        />
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 15,
  },
  noteList: {
    marginVertical: 20,
    paddingBottom: 20,
  },
  screen: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 36,
    lineHeight: 42,
  },
});
