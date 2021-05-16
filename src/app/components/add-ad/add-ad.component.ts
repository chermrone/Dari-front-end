import {Component, OnInit} from '@angular/core';
import {Ad} from '../../models/Ad';
import {NgForm} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Typead} from '../../enumeration/Typead';
import {TypeBatiment} from '../../enumeration/TypeBatiment';
import {Observable, Subscription} from 'rxjs';
import {UploadFileService} from '../../services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {WebsocketService} from '../../services/websocket.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Route, Router, Routes} from "@angular/router";
import {CustomSnackBarComponent} from "../custom-snack-bar/custom-snack-bar.component";
import {NotifwebsocketService} from "../../services/notifwebsocket.service";
import {User} from "../../models/user";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
 roles: string[];
  constructor(private token: TokenStorageService,private AdServ: AdService,private  route:Router, private _snackBar: MatSnackBar, private uploadService: UploadFileService, private websock: NotifwebsocketService) {
    this.keysBat = Object.keys(this.symbolsBat);
    this.keysTyp = Object.keys(this.symbols);
    this.cities=['ariana', 'beja', 'ben arous', 'bizerte', 'gabes', 'gafsa', 'jandouba', 'karawen', 'gasrin', 'gbelli', 'kef', 'mahdia', 'manouba', 'mednine', 'mistir', 'nabeul', 'sfax', 'sidi bouzid', 'siliana', 'sousse', 'tataouine', 'tozeur', 'tunis', 'zaghouan'];

  }
  cities:string[]=[];
  keysBat = [];
  keysTyp = [];
  symbols = Typead;
  symbolsBat = TypeBatiment;
  estimationPrice: any;
  estimationDuration: any;

  selectedFiles: FileList;
  selectedFilesvid: FileList;
  currentFileVid: File;

  currentFile: File;
  message = '';
  fileInfos: Observable<any>;
  progressInfos = [];  progressInfosVid = [];
type = ''; typeimg = '';
   notif: string;
   msgComplete: string;
  p: Ad;
  messagenotif = [];

// tslint:disable-next-line:label-
  private sub: Subscription;
verif = true;

  ngOnInit(): void {
    this.roles= this.token.getAuthorities();

  }
  PostAd(f: NgForm) {
    this.websock.postnotif=true; console.log(this.websock.postnotif)
    const p = {} as Ad;
    if (typeof(this.currentFile) != 'undefined') {
      this.currentFile = this.selectedFiles.item(0); console.log(this.currentFile);
    }
    else {this.verif = true;
    }

    if (typeof(this.currentFileVid) != 'undefined') {
      this.currentFileVid = this.selectedFilesvid.item(0);
      console.log(this.currentFileVid);
    }
    console.log(f.value);
    const returnedTarget: Ad = Object.assign(p, f.value); // convert the form to object in p
    console.log(p);
    this.sub = this.AdServ.postAd(p).subscribe(data => {
      console.log('success');
      this.AdServ.getLastAd().subscribe(data => {
        this.message = '';

        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.upload(i, this.selectedFiles[i]);
        }
        if (this.count != "undefined")
        {
        for (let i = 0; i < this.selectedFilesvid.length; i++) {
          this.uploadVideo(i, this.selectedFilesvid[i]);
        }}
        this.msgComplete = ' you Ad has been successfully Added';
        this.websock.sendNotif(data);
        this.messagenotif = this.websock.messageNotif;console.log(this.websock.messageNotif)
        for (let notif of this.websock.messageNotif)
        {let add:Ad =notif;
         /* if(this.AdServ.VerifCancel)
          {this._snackBar.openFromComponent(CustomSnackBarComponent, {
            duration: 10*2000,
          }); }*/
        }
      });
    });
  }

  private view(adId: number) {
    this.AdServ.idAd=adId;
   // this.route.navigate(["ad/",adId])
    return "true";
  }


  // tslint:disable-next-line:typedef
  EstimationPrice(f: NgForm) {
    const p = {} as Ad;
    const returnedTarget: Ad = Object.assign(p, f.value); // convert the form to object in p
    console.log(p);
    this.AdServ.EstimationPrice(p).subscribe(data => {
      console.log('success');
      this.estimationPrice = data;
      console.log(data);
    });
  }

  EstimationDuration(f: NgForm) {
    const p = {} as Ad;
    const returnedTarget: Ad = Object.assign(p, f.value); // convert the form to object in p
    this.AdServ.EstimationDuration(p).subscribe(data => {
      console.log('success');
      this.estimationDuration = data;
      console.log(data);
    });
  }



  upload(idx, file) {
    if (this.typeimg == 'image') {
      this.progressInfos[idx] = {value: 0, fileName: file.name};
      this.AdServ.getLastAd().subscribe(data => {console.log(this.typeimg);
this.uploadService.upload(file, this.typeimg, data as Ad).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          err => {
            this.progressInfos[idx].value = 0;
            this.message = 'Could not upload the file:' + file.name;
          });
      });
    }}
  uploadVideo(idx, file) {
      this.progressInfosVid[idx] = {value: 0, fileName: file.name};
      this.AdServ.getLastAd().subscribe(data => {
        this.uploadService.upload(file, this.type, data as Ad).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfosVid[idx].value = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          err => {
            this.progressInfosVid[idx].value = 0;
            this.message = 'Could not upload the file:' + file.name;
          });
      });

  }
count:any="undefined";
  selectvideos( Event) {
    this.progressInfosVid = [];
    this.selectedFilesvid = Event.target.files;
    this.type = 'video';this.count=0;
  }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;    this.typeimg = 'image';
    this.verif = false;
  }

  save(f: NgForm) {

  }
}

