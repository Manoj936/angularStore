export const ABLUM_LIST_REQUEST = 'album list request';
export const ALBUM_LIST_SUCCESS = 'album list success' ;




export class AlbumListRequestAction{
  readonly type = ABLUM_LIST_REQUEST
}

export class AlbumListSuccessAction{
  readonly type = ALBUM_LIST_SUCCESS
  constructor(public  payload?:any){}
}

