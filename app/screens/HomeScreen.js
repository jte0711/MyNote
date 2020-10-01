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
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import NoteCard from "../components/NoteCard";
import AddButton from "../components/AddButton";
import colors from "../config/colors";
// import useApi from "../hooks/useApi";
// import apiClient from "../api/notes";
import useAsyncStore from "../hooks/useAsync";
import asyncNote from "../api/asyncNote";
import asyncNotes from "../api/asyncNotes";
import asyncStorage from "../utility/asyncStorage";
import welcomeData from "../config/firstLoad";
import { storageKey, firstKey } from "../config/env";

const HomeScreen = ({ navigation }) => {
  const getNotesApi = useAsyncStore(asyncNotes.getAllNotes);
  const [search, setSearch] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // const [firstNotes, setFirstNotes] = useState();

  const refreshHandler = () => {
    setRefresh(true);
    getNotesApi.request();
    setRefresh(false);
  };

  const firstCheck = async () => {
    const firstCheck = await asyncStorage.getData(firstKey);
    if (firstCheck) {
    } else {
      await asyncStorage.storeData(firstKey, { NotFirstTime: true });
      for (let i = 0; i < welcomeData.length; i++) {
        await asyncNote.addNote(welcomeData[i]);
      }
      refreshHandler();
    }
  };

  useEffect(() => {
    firstCheck();
    const onFocusRefresh = navigation.addListener("focus", () => {
      refreshHandler();
    });

    return onFocusRefresh;
  }, [navigation]);

  return (
    <>
      <Screen style={styles.screen}>
        <View style={styles.screenView}>
          <Text style={styles.title}>Notes</Text>
          <View style={styles.iconRow}>
            <MaterialIcons
              style={styles.icon}
              name="sort"
              color="black"
              size={30}
              style={{ display: "none" }}
            />
            <Icon
              onPress={() => setSearch(true)}
              iconStyle={[styles.icon, { display: "none" }]}
              iconName="search"
              iconColor="black"
              iconSize={30}
            />
            <Icon
              onPress={async () => {
                await asyncStorage.clearData(storageKey);
                await asyncStorage.clearData(firstKey);
                refreshHandler();
              }}
              iconStyle={styles.icon}
              iconName="settings"
              iconColor="black"
              iconSize={30}
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
        <View testID="noteList" style={styles.noteList}>
          <FlatList
            data={getNotesApi.data}
            keyExtractor={(item) => {
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
          testID="AddButton"
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
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  screenView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 36,
    lineHeight: 42,
  },
});
