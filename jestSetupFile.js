import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock";

const testData = [
  {
    data: {
      title: "Hello bro",
      content: "This is the content of the note",
      id: 1,
    },
  },
  {
    data: {
      title: "Hello world",
      content: "This is the world my buddy",
      id: 2,
    },
  },
];

mockAsyncStorage.getItem = jest.fn(async () => {
  return JSON.stringify(testData[0]);
});

jest.mock("@react-native-community/async-storage", () => mockAsyncStorage);
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
