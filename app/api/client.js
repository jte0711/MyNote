import { create } from "apisauce";
import cache from "../utility/cache";
import settings from "../config/settings";

const apiClient = create({
  baseURL: settings.apiUrl,
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  console.log("test");
  console.log(response.data);
  if (response.ok) {
    cache.store(url, response.data);
    return response.data;
  }

  const data = await cache.get(url);
  console.log(data);
  return data ? { ok: true, data } : response;
};

export default apiClient;
