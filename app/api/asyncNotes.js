import asyncStorage from "../utility/asyncStorage";

const getAllNotes = async () => await asyncStorage.getData();

export default {
  getAllNotes,
};
