import { ActionReducerMap, createSelector } from '@ngrx/store';
import { UserReducerState } from './user-reducer';
import * as fromUser  from './user-reducer';
import { PostReducerState } from './post-reducer';
import * as fromPosts from './post-reducer';
import { AlbumReducerState } from './album-reducer';
import * as fromAlbum from './album-reducer';

export interface RootReducerState{
  users : UserReducerState;
  posts : PostReducerState;
  albums : AlbumReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUser.UserReducer,
  posts: fromPosts.PostReducer,
  albums: fromAlbum.AlbumReducer

};

export const getUserState = (state: RootReducerState) => state.users;
export const getPostState = (state:RootReducerState) => state.posts;
export const getAlbumState = (state:RootReducerState) =>state.albums;

//Selectors for user
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUserLoading = createSelector(getUserState, fromUser.getLoading);
export const getUsers =  createSelector(getUserState, fromUser.getUsers);


//Selectors for posts
export const getPostLoaded = createSelector(getPostState, fromPosts.getPostLoaded);
export const getPostLoading = createSelector(getPostState, fromPosts.getPostLoading);
export const getPosts= createSelector(getPostState, fromPosts.getPosts);

//Selectors for posts
export const getAlbumLoaded = createSelector(getAlbumState, fromAlbum.getAlbumLoaded);
export const getAlbumLoading = createSelector(getAlbumState, fromAlbum.getAlbumLoading);
export const getAlbums = createSelector(getAlbumState, fromAlbum.getAlbums);
