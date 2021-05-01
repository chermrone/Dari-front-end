import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {SignupInfo } from '../../auth/signup-info';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {UploadFileService} from "../../services/upload-file.service";
import {Typead} from "../../enumeration/Typead";
import {Ad} from "../../models/Ad";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  signupInfo!: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  user: User = new User();


  selectedFiles: FileList;
  selectedFilesvid: FileList;
  currentFileVid: File;

  currentFile: File;
  message = '';
  fileInfos: Observable<any>;
  progressInfos = [];  progressInfosVid = [];
  type="";typeimg="";
  verif= true;
  symbol = Typead;
  keys = [];
  constructor(private authService: AuthService,private us: UserService, private uploadService: UploadFileService, private matdialogref: MatDialogRef<RegisterComponent>) {this.keys = Object.keys(this.symbol); }

  // tslint:disable-next-line:typedef
  ngOnInit() { }

  // tslint:disable-next-line:typedef
  hide=true;
  onSubmit(f:NgForm) {
    const p = {} as User;
    if (typeof(this.currentFile) != 'undefined') {
      this.currentFile = this.selectedFiles.item(0);console.log(this.currentFile);
    }
    else {this.verif=true;
    }


    console.log(f.value);
    const returnedTarget: User = Object.assign(p, f.value); // convert the form to object in p
    console.log(p);
    console.log(this.form);

    this.signupInfo = new SignupInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.userName,
      this.form.age,
      this.form.phoneNumber,
      this.form.cin,
      this.form.roles,
      this.form.email,
      this.form.password,
      this.form.gender
    );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = false;
        this.isSignUpFailed = false;


        this.us.getLastUser().subscribe(data => {
          this.message = '';
console.log("entrer last user");

          this.upload(0, this.selectedFiles[0]);

        });
      }); }
    onclose(){
      this.matdialogref.close();
      this.us.iduser = 0 ;
      this.user = new User();
    }

      /*error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  onclose() {
    this.matdialogref.close();
    this.us.iduser = 0 ;
    this.user = new User();
  }*/



  upload(idx, file) {
    if (this.typeimg =='image') {
      this.progressInfos[idx] = {value: 0, fileName: file.name};
      this.us.getLastUser().subscribe(data => {
        this.uploadService.uploaded(file, this.type, data as User).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.fileInfos = this.uploadService.getFilesuser();
            }
          },
          err => {
            this.progressInfos[idx].value = 0;
            this.message = 'Could not upload the file:' + file.name;
          });
      });
    }}
  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;    this.typeimg="image";
    this.verif = false;
  }
}
