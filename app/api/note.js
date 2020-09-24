import client from "./client";

const endpoint = "/note";

const addNote = (note) => {
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

  return client.post(endpoint, data);
};

const deleteNote = (id) => {
  return client.delete(endpoint + "/" + id.toString());
};

const editNote = (note, id) => {
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
  let url = endpoint + "/" + id.toString();
  return client.put(url, data);
};

export default {
  addNote,
  deleteNote,
  editNote,
};
