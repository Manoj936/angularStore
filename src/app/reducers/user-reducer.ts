import { Action } from '../actions/index';
import { USER_LIST_REQUEST, USER_LIST_SUCCESS } from '../actions/user-action';
export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  users: any;
}

const InitialState: UserReducerState = {
  loading: false,
  loaded: false,
  users: []
}

export function UserReducer(state = InitialState, action: Action) {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return { ...state, loading: true }
    }
    case USER_LIST_SUCCESS: {
      const data = action.payload
      return { ...state, loading: false, loaded: true, users: data }
    }
    default: {
      return state;
    }
  }
}

//selectors


export const getLoading = (state: UserReducerState) => state.loading
export const getLoaded = (state: UserReducerState) =>  state.loaded
export const getUsers = (state: UserReducerState) => state.users
