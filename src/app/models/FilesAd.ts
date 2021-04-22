import {Ad} from "./Ad";

export class FilesAd {
   id:number;

  name:String;

  type:String;

  //image bytes can have large lengths so we specify a value
  //which is more than the default length for picByte column
 picByte:Uint8Array[];
  ad:Ad ;
  stri:String;
}
