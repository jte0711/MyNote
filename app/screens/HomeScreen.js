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
// import useApi from "../hooks/useApi";
// import apiClient from "../api/notes";
import useAsyncStore from "../hooks/useAsync";
import asyncNotes from "../api/asyncNotes";
import asyncStorage from "../utility/asyncStorage";

const HomeScreen = ({ navigation }) => {
  const getNotesApi = useAsyncStore(asyncNotes.getAllNotes);
  const [search, setSearch] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refreshHandler = () => {
    setRefresh(true);
    console.log("refresh");
    getNotesApi.request();
    setRefresh(false);
  };

  useEffect(() => {
    refreshHandler();
    const onFocusRefresh = navigation.addListener("focus", () => {
      refreshHandler();
    });

    return onFocusRefresh;
  }, [navigation]);

  return (
    <>
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
              style={{ display: "none" }}
            />
            <TouchableOpacity
              style={{ display: "none" }}
              onPress={() => setSearch(true)}
            >
              <MaterialIcons
                style={styles.icon}
                name="search"
                color="black"
                size={30}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                asyncStorage.clearData();
                console.log(" ---------- CLEAR DATA ----------");
                refreshHandler();
              }}
              style={{ display: "none" }}
            >
              <MaterialIcons
                style={styles.icon}
                name="settings"
                color="black"
                size={30}
              />
            </TouchableOpacity>
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
            keyExtractor={(item) => {
              // console.log("this is flatlist item ", item);
              return item.id.toString();
            }}
            onRefresh={refreshHandler}
            refreshing={refresh}
            renderItem={({ item }) => (
              <NoteCard
                content={item.content}
                title={item.title}
                labels={item.labels}
                id={item.id}
                handleRefresh={() => {
                  setRefresh(true);
                  console.log("refresh");
                  getNotesApi.request();
                  setRefresh(false);
                }}
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
