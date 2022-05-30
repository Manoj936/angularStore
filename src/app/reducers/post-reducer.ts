import { Action } from '../actions/index';
import { POST_LIST_REQUEST, POST_LIST_SUCCESS } from '../actions/post-action';
export interface PostReducerState {
  loading: boolean;
  loaded: boolean;
  posts: any
}

const initialState: PostReducerState = {
  loading: false,
  loaded: false,
  posts: []
}

export function PostReducer(state = initialState, action: Action) {
  switch (action.type) {

    case POST_LIST_REQUEST: {
      return { ...state, loading: true }
    }
    case POST_LIST_SUCCESS: {
      const data = action.payload;
      return { ...state, loaded: true, loading: false, posts: data }
    }
    default: {
      return state
    }
  }
}

//selectors

export const getPostLoading = (state: PostReducerState) => state.loading;
export const getPostLoaded = (state: PostReducerState) => state.loaded;
export const getPosts = (state: PostReducerState) => state.posts;
