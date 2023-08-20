import { useState } from 'react';
import { DrinksResponse, MealsResponse } from '../types';

const initalState = {
  drinks: [],
  meals: [],
};

function useFetch() {
  const [data, setData] = useState<DrinksResponse | MealsResponse>(initalState);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('success');

  const fetchRecipes = async (searchURL: string) => {
    try {
      const response = await fetch(searchURL);
      const dataAPI: DrinksResponse | MealsResponse = await response.json();
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
