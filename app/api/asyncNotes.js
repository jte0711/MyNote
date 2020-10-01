import asyncStorage from "../utility/asyncStorage";
import { storageKey } from "../config/env.js";

const getAllNotes = async () => await asyncStorage.getData(storageKey);

export default {
  getAllNotes,
};
