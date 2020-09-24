import AsyncStorage from "@react-native-community/async-storage";

const storageKey = "async";

const getData = async () => {
  try {
    const result = await AsyncStorage.getItem(storageKey);
    return result != null ? JSON.parse(result) : null;
  } catch (error) {
    // console.log(error);
  }
};

const storeData = async (val) => {
  // val is a JSON object
  try {
    const strValue = JSON.stringify(val);
    await AsyncStorage.setItem(storageKey, strValue);
    return { status: "ok" };
  } catch (error) {
    // console.log(error);
    return { status: "Memory full" };
  }
};

const clearData = async () => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (error) {
    // console.log(error);
  }
};

export default {
  clearData,
  getData,
  storeData,
};
