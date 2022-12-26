import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../http.service';
import { getAlbumLoaded, getAlbumLoading ,getAlbums, RootReducerState } from '../reducers/index';
import { combineLatest } from 'rxjs';
import { AlbumListSuccessAction, AlbumListRequestAction } from '../actions/album-action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  albums: any = [];
  constructor(private store: Store<RootReducerState>, private httpServcie: HttpService) { }

  ngOnInit(): void {
    this.fetchAlbums();
  }
  fetchAlbums() {
    const isLoading$ = this.store.select(getAlbumLoading);
    const isLoaded$ = this.store.select(getAlbumLoaded);
    const getAlbum = this.store.select(getAlbums);
    combineLatest([isLoaded$ , isLoading$]).subscribe(data => {
      if (!data[0] && !data[1]) {
        this.store.dispatch(new AlbumListRequestAction());
        this.httpServcie.get('photos').subscribe((data) => {
          this.store.dispatch(new AlbumListSuccessAction(data))
        })
      }
    })
    getAlbum.subscribe((res) => {
      this.albums = res;
      console.log(this.albums)
    })
  }
}
