import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  HttpService } from '../http.service';
import { RootReducerState, getPostLoading, getPostLoaded, getPosts } from '../reducers/index';
import { combineLatest } from 'rxjs';
import { PostListRequestAction, PostListSuccessAction } from '../actions/post-action';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts : any = [];
  constructor(private httpService : HttpService , private store: Store<RootReducerState>) { }

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts() {
    const isLoading$ = this.store.select(getPostLoading);
    const isLoaded$ = this.store.select(getPostLoaded);
    const getAllPosts = this.store.select(getPosts);

    combineLatest([isLoaded$ , isLoading$]).subscribe(data => {
      if (!data[0] && !data[1]) {
        this.store.dispatch(new PostListRequestAction());
        this.httpService.get('posts').subscribe((data) => {
          this.store.dispatch(new PostListSuccessAction(data))
        })
      }
    })
    getAllPosts.subscribe((data) => {
      console.log({data});
     this.posts = data
    })

  }
}
