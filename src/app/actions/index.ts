import { Action as ngRxAction } from '@ngrx/store';

export interface Action extends ngRxAction {
  payload?: any
}
