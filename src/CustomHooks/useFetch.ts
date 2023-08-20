import { useState } from 'react';

function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('success');

  const fetchRecipes = async (searchURL: string) => {
    try {
      const response = await fetch(searchURL);
      const dataAPI = await response.json();
      setData(dataAPI);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, errorMsg, setData, fetchRecipes };
}

export default useFetch;
