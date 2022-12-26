import { ABLUM_LIST_REQUEST, ALBUM_LIST_SUCCESS } from '../actions/album-action';
import { Action } from '../actions/index';

export interface AlbumReducerState {
  loading: boolean;
  loaded: boolean;
  albums: any;
}

const initialState: AlbumReducerState = {
  loading: false,
  loaded: false,
  albums: []
}

export function AlbumReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ABLUM_LIST_REQUEST: {
      return { ...state, loading: true }
    }
    case ALBUM_LIST_SUCCESS: {
      const data = action.payload
      return { ...state, loading: false, loaded: true, albums: data }
    }
    default: {
      return state;
    }
  }
}

export const getAlbumLoading = (state :AlbumReducerState) => state.loading

export const getAlbumLoaded = (state :AlbumReducerState) => state.loaded

export const getAlbums = (state :AlbumReducerState) => state.albums
