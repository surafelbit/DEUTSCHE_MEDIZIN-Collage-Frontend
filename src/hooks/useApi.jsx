import { useState, useEffect } from "react";
import apiService from "../components/api/apiService";
const useApi = (endpoint, method = "get", body = null, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (method == "get") {
          result = apiService.get(endpoint, params);
        }
        if (method == "post") {
          result = apiService.post(endpoint, body);
        }
        if (method == "delete") {
          result = apiService.delete(endpoint);
        }
        if (method == "put") {
          result = apiService.put(endpoint, body);
        }
        setData(result);
      } catch (error) {
        setError(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [method, endpoint, body, params]);
  return { data, loading, error };
};
export default useApi;
