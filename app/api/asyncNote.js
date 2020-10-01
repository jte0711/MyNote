import asyncStorage from "../utility/asyncStorage";
import { storageKey } from "../config/env.js";

/*
  ---------- Form of Note Data ----------
  const data = {
    title: String
    content: String
    labels: Object {
      text: String
      color: String
      id: Integer
    }
    id: Integer
  }
*/

const addNote = async (note) => {
  const data = {
    title: note.title,
    content: note.content,
    labels: [],
  };

  note.labels.forEach((label, index) =>
    data.labels.append({
      text: label.text,
      color: label.color,
      id: index + 1,
    })
  );

  let notes = await asyncStorage.getData(storageKey);
  if (notes && notes.data.length != 0) {
    data.id = notes.data[notes.data.length - 1].id + 1;
  } else {
    notes = { data: [] };
    data.id = 1;
  }
  notes.data.push(data);
  return await asyncStorage.storeData(storageKey, notes);
};

const deleteNote = async (id) => {
  let notes = await asyncStorage.getData(storageKey);

  for (let i = 0; i < notes.data.length; i++) {
    if (notes.data[i].id == id) {
      notes.data.splice(i, 1);
      break;
    }
  }

  return await asyncStorage.storeData(storageKey, notes);
};

const editNote = async (note, id) => {
  const data = {
    title: note.title,
    content: note.content,
    labels: [],
    id: id,
  };

  note.labels.forEach((label, index) =>
    data.labels.append({
      text: label.text,
      color: label.color,
      id: index + 1,
    })
  );

  let notes = await asyncStorage.getData(storageKey);

  for (let i = 0; i < notes.data.length; i++) {
    if (notes.data[i].id == id) {
      notes.data.splice(i, 1, data);
      break;
    }
  }
  return await asyncStorage.storeData(storageKey, notes);
};

export default {
  addNote,
  deleteNote,
  editNote,
};
