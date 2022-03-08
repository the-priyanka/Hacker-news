import React, { useContext, useEffect, useReducer } from "react";
import {
  SET_LOADING,
  SET_PAGE,
  SET_REMOVE,
  SET_SEARCH,
  SET_STORIES,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  hits: [],
  query: "react",
  page: 0,
  nbPages: 0,
};

const AppContext = React.createContext();

const AppProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeStory = (id) => {
    dispatch({ type: SET_REMOVE, payload: id });
  };

  const handleSearch = (query) => {
    dispatch({ type: SET_SEARCH, payload: query });
  };

  const handlePage = (value) => {
    dispatch({ type: SET_PAGE, payload: value });
  };

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStories(
      `${API_ENDPOINT}query=${state.query}&page=${state.page}`
    );
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
