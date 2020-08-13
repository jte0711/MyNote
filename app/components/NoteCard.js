import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import Label from "./Label";

const NoteCard = ({ title, content, labels, pressFunction }) => {
  return (
    <TouchableWithoutFeedback onPress={pressFunction}>
      <View style={styles.note}>
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
  note: {
    // ----- Fix later -----
    backgroundColor: "#FBFEFE",
    borderRadius: 15,
    elevation: 3,
    minHeight: 119,
    marginVertical: 15,
    padding: 15,
    shadowColor: "rgba(7, 33, 32, 0.3)",
    shadowRadius: 2.5,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    width: "100%",

    // ----- END -----
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
