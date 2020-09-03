import AsyncStorage from "@react-native-community/async-storage";

const storageKey = "async";

const getData = async () => {
  try {
    const result = await AsyncStorage.getItem(storageKey);
    console.log("this is result", result);
    return result != null ? JSON.parse(result) : null;
  } catch (error) {
    console.log(error);
  }
};

const storeData = async (val) => {
  // val is a JSON object
  try {
    const strValue = JSON.stringify(val);
    await AsyncStorage.setItem(storageKey, strValue);
    console.log(strValue);
  } catch (error) {
    console.log(error);
  }
};

const clearData = async () => {
  try {
    await AsyncStorage.removeItem(storageKey);
    console.log("data cleared");
  } catch (error) {
    console.log(error);
  }
};

export default {
  clearData,
  getData,
  storeData,
};
