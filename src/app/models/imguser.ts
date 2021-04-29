import {User} from './user';


export class imguser {
  id: number;

  name: string;

  type: string;

  // image bytes can have large lengths so we specify a value
  // which is more than the default length for picByte column
  picByte: Uint8Array[];
  us: User;
  stri: String;
}
