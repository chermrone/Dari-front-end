import {Component, OnInit} from '@angular/core';
import {Ad} from '../../models/Ad';
import {NgForm} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Typead} from '../../enumeration/Typead';
import {TypeBatiment} from '../../enumeration/TypeBatiment';
import {Observable} from "rxjs";
import {UploadFileService} from "../../services/upload-file.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
  keysBat = [];
  keysTyp = [];
  symbols = Typead;
  symbolsBat = TypeBatiment;
  estimationPrice: any;
  estimationDuration: any;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;


  constructor(private AdServ: AdService, private uploadService: UploadFileService) {
    this.keysBat = Object.keys(this.symbolsBat);
    this.keysTyp = Object.keys(this.symbols);

  }

  p: Ad;

// tslint:disable-next-line:label-

  ngOnInit(): void {

  }

  PostAd(f: NgForm) {
    const p = {} as Ad;
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    console.log(f.value);
    const returnedTarget: Ad = Object.assign(p, f.value); // convert the form to object in p
    console.log(p);
    this.AdServ.postAd(p).subscribe(data => {
      console.log('success');
      this.AdServ.getLastAd().subscribe(data => {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        this.uploadService.upload(this.currentFile, "image", data as Ad).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          err => {
            this.progress = 0;
            this.message = 'Could not upload the file!';
            this.currentFile = undefined;
          });

        this.selectedFiles = undefined;
      })
    });
  }

  save(f: NgForm) {
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


  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {

  }
}
