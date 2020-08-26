import client from "./client";

const endpoint = "/note";

const addNote = (note) => {
  const data = new FormData();
  data.append("title", note.title);
  data.append("content", note.price);

  note.labels.forEach((label, index) =>
    data.append("labels", {
      text: label.text,
      color: label.color,
      id: index + 1,
    })
  );

  return client.post(endpoint, data);
};

const editNote = (note, id) => {
  const data = new FormData();
  data.append("title", note.title);
  data.append("content", note.price);

  note.labels.forEach((label, index) =>
    data.append("labels", {
      text: label.text,
      color: label.color,
      id: index + 1,
    })
  );

  return client.post(endpoint + "/" + toString(id), data);
};

export default {
  addNote,
  editNote,
};
