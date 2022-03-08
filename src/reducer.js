import {
  SET_LOADING,
  SET_PAGE,
  SET_REMOVE,
  SET_SEARCH,
  SET_STORIES,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };

    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };

    case SET_REMOVE:
      return {
        ...state,
        hits: state.hits.filter(
          (story) => story.objectID !== action.payload
        ),
      };

    case SET_SEARCH:
      return { ...state, query: action.payload, page: 0 };

    case SET_PAGE:
      if (action.payload === "inc") {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      } else if (action.payload === "dec") {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }

      break;

    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};

export default reducer;
