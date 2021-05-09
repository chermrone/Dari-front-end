import {Component, OnInit} from '@angular/core';
import {Typead} from '../../enumeration/Typead';
import {TypeBatiment} from '../../enumeration/TypeBatiment';
import {Observable, Subscription} from 'rxjs';
import {AdService} from '../../services/ad.service';
import {UploadFileService} from '../../services/upload-file.service';
import {Ad} from '../../models/Ad';
import {NgForm} from '@angular/forms';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {FournitureAd} from '../../models/FournitureAd';
import {FournitureAdServiceService} from '../../services/fourniture-ad-service.service';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-add-fourniture-ad',
  templateUrl: './add-fourniture-ad.component.html',
  styleUrls: ['./add-fourniture-ad.component.scss']
})
export class AddFournitureAdComponent implements OnInit {
  errors: string[] = null;
  sent = false;
  // files
  selectedFiles: FileList = null;
  message = '';
  progressInfos = new Array();
  verif = false;

  constructor( private fournitureAdServiceService: FournitureAdServiceService,
               private tokenStorageService: TokenStorageService) {
  }
   regions = ['Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili', 'Gouvernorat du Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'];
  ngOnInit(): void {
    this.selectedFiles = null;
  }
  PostAd(f: NgForm): void {
    this.sent = true;
    this.errors = [];
    const p = {} as FournitureAd;
    console.log(f.value);
    const returnedTarget: FournitureAd = Object.assign(p, f.value); // convert the form to object in p
    p.userName = this.tokenStorageService.getUsername();
    console.log(p);
    this.fournitureAdServiceService.postFournitureAd(p).subscribe(
      data => {console.log('sent');
               Array.from(this.selectedFiles).forEach((selectedFilesKey) =>
               {
                 console.log('file uploaded' + selectedFilesKey);
                 this.upload(data.faID , selectedFilesKey);
               }) ;
      },
      (err) => {console.log('error' + JSON.stringify(err));
                if (err.error.includes('ne doit pas être vide')){
                  this.errors.push('ne doit pas être vide'); }
      },
      () => {console.log('complete');
             this.errors = null;
      }

    );
  }
  save(f: NgForm): void {
  }

  upload(id , file): void{
      this.fournitureAdServiceService.uploadFile(file , id).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log('progress info' + this.progressInfos);
              const value = Math.round(100 * event.loaded / event.total);
              if (this.progressInfos ==  null){
                this.progressInfos = [{ value , fileName: file.name}];
                console.log('progress info' + this.progressInfos);
              }
              else {this.progressInfos.push( { value , fileName: file.name} ) ; }
            } else if (event instanceof HttpResponse) {
              console.log('finish file upload', file.name);
            }
          },
          err => {
            this.message = 'Could not upload the file:' + file.name;
          });
      this.selectedFiles = null;
    }
  selectFiles(event): void{
    this.progressInfos = null;
    this.selectedFiles = event.target.files;
    console.log('9a3ed yselecty');
    console.log(JSON.stringify(event.target.files));
    this.verif = false;
  }
}
