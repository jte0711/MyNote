import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    console.log("This is response result ", response.result);
    setError(!response.ok);
    setData(response.result);
    return response;
  };
  return { data, error, loading, request };
};

export default useApi;
