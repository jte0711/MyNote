import client from "./client";

const endpoint = "/notes";

const getData = () => client.get(endpoint);

export default {
  getData,
};
