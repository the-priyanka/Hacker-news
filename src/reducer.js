import { SET_LOADING, SET_REMOVE, SET_STORIES } from "./actions";

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

    default:
      throw new Error(`no matching "${action.type}" action type`);
  }
};

export default reducer;
