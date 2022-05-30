import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from '../http.service';
import { UserListRequestAction, UserListSuccessAction } from '../actions/user-action';
import { getUsers, RootReducerState, getUserLoading, getUserLoaded } from '../reducers';
import { combineLatest } from 'rxjs';






@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user : any = [];
  constructor(private httpserv: HttpService, private store: Store<RootReducerState>) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    const isLoading$ = this.store.select(getUserLoading);
    const isLoaded$ = this.store.select(getUserLoaded);
    const getUserData = this.store.select(getUsers);

    combineLatest([isLoaded$ , isLoading$]).subscribe(data => {
      //console.log(data[0], data[1])
      if (!data[0] && !data[1]) {
        this.store.dispatch(new UserListRequestAction());
        this.httpserv.get('users').subscribe((data) => {
          this.store.dispatch(new UserListSuccessAction(data))
        })
      }
    })
    getUserData.subscribe((data) => {
      console.log({data});
     this.user = data
    })

  }
}

