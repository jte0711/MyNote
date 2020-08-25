import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Input from "../components/Input";
import Screen from "../components/Screen";
import NoteCard from "../components/NoteCard";
import AddButton from "../components/AddButton";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import apiClient from "../api/notes";
import ActivityIndicator from "../components/ActivityIndicator";

// const noteList = [
//   {
//     id: 1,
//     title: "Notes Title",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitaenunc at velit sodales vehicula sed sed elit.",
//     labels: [
//       { id: 1, text: "Urgent", color: "#F53D3D" },
//       { id: 2, text: "Productivity", color: "#849EFB" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Long Description",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae nunc at velit sodales vehicula sed sed elit. and then add",
//     labels: [
//       { id: 1, text: "Urgent", color: "#F53D3D" },
//       { id: 2, text: "Productivity", color: "#849EFB" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Overly Long Notes Title That Took Everything",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae nunc at velit sodales vehicula sed sed elit. ",
//     labels: [
//       { id: 1, text: "Urgent", color: "#F53D3D" },
//       { id: 2, text: "Productivity", color: "#849EFB" },
//     ],
//   },
//   {
//     id: 4,
//     title:
//       "Overly Long Notes Title That Took Everything Wayyyyy too long to read please cut it off mate",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae nunc at velit sodales vehicula sed sed elit. ",
//     labels: [
//       { id: 1, text: "Urgent", color: "#F53D3D" },
//       { id: 2, text: "Productivity", color: "#849EFB" },
//     ],
//   },
//   {
//     id: 5,
//     title: "I don't know what to write anymore",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae nunc at velit sodales vehicula sed sed elit. ",
//     labels: [
//       { id: 1, text: "Urgent", color: "#F53D3D" },
//       { id: 2, text: "Productivity", color: "#849EFB" },
//     ],
//   },
// ];

const HomeScreen = ({ navigation }) => {
  const getNotesApi = useApi(apiClient.getData);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    getNotesApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getNotesApi.loading} />
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
            <TouchableOpacity onPress={() => setSearch(true)}>
              <MaterialIcons
                style={styles.icon}
                name="search"
                color="black"
                size={30}
              />
            </TouchableOpacity>

            <MaterialIcons
              style={styles.icon}
              name="settings"
              color="black"
              size={30}
            />
          </View>
        </View>
        {search ? (
          <View style={{ flexDirection: "row" }}>
            <Input style={styles.searchInput}></Input>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setSearch(false)}
            >
              <Ionicons
                name="ios-close-circle-outline"
                size={24}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.noteList}>
          <FlatList
            data={getNotesApi.data}
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
        <AddButton
          color={colors.primary}
          iconName={"ios-add"}
          iconColor={colors.white}
          iconSize={60}
          onPress={() => navigation.navigate("Note")}
        />
      </Screen>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  closeIcon: {
    alignSelf: "center",
    top: 7,
    right: 30,
  },
  icon: {
    marginLeft: 15,
  },
  noteList: {
    marginVertical: 20,
    paddingBottom: 20,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0.2,
    borderStyle: "solid",
    borderColor: "#000000",
    borderRadius: 50,
    height: 30,
    width: "100%",
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
