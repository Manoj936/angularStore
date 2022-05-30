import { ActionReducerMap, createSelector } from '@ngrx/store';
import { UserReducerState } from './user-reducer';
import * as fromUser  from './user-reducer';
import { PostReducerState } from './post-reducer';
import * as fromPosts from './post-reducer';

export interface RootReducerState{
  users : UserReducerState;
  posts : PostReducerState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUser.UserReducer,
  posts: fromPosts.PostReducer

};

export const getUserState = (state: RootReducerState) => state.users;
export const getPostState = (state:RootReducerState) => state.posts;

//Selectors for user
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUserLoading = createSelector(getUserState, fromUser.getLoading);
export const getUsers =  createSelector(getUserState, fromUser.getUsers);


//Selectors for posts
export const getPostLoaded = createSelector(getPostState, fromPosts.getPostLoaded);
export const getPostLoading = createSelector(getPostState, fromPosts.getPostLoading);
export const getPosts= createSelector(getPostState, fromPosts.getPosts);
