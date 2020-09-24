import asyncStorage from "../utility/asyncStorage";

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

  let notes = await asyncStorage.getData();
  if (notes && notes.data.length != 0) {
    data.id = notes.data[notes.data.length - 1].id + 1;
  } else {
    notes = { data: [] };
    data.id = 1;
  }
  notes.data.push(data);
  return await asyncStorage.storeData(notes);
};

const deleteNote = async (id) => {
  let notes = await asyncStorage.getData();

  for (let i = 0; i < notes.data.length; i++) {
    if (notes.data[i].id == id) {
      notes.data.splice(i, 1);
      break;
    }
  }

  return await asyncStorage.storeData(notes);
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

  let notes = await asyncStorage.getData();

  for (let i = 0; i < notes.data.length; i++) {
    if (notes.data[i].id == id) {
      notes.data.splice(i, 1, data);
      break;
    }
  }
  return await asyncStorage.storeData(notes);
};

export default {
  addNote,
  deleteNote,
  editNote,
};
