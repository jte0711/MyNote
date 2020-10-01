import AsyncStorage from "@react-native-community/async-storage";

const getData = async (key) => {
  try {
    const result = await AsyncStorage.getItem(key);
    return result != null ? JSON.parse(result) : null;
  } catch (error) {
    // console.log(error);
  }
};

const storeData = async (key, val) => {
  // val is a JSON object
  try {
    const strValue = JSON.stringify(val);
    await AsyncStorage.setItem(key, strValue);
    return { status: "ok" };
  } catch (error) {
    // console.log(error);
    return { status: "Memory full" };
  }
};

const clearData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // console.log(error);
  }
};

export default {
  clearData,
  getData,
  storeData,
};
