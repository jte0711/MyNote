import { useState } from "react";

const useAsyncStore = (asyncFunc) => {
  const [data, setData] = useState([]);
  // const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    console.log("Called");
    setLoading(true);
    const response = await asyncFunc(...args);
    setLoading(false);
    setData(response ? response.data : null);
  };

  return { data, loading, request };
};

export default useAsyncStore;
