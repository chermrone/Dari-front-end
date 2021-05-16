import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Ad } from 'src/app/models/Ad';
import {AdService} from '../../services/ad.service';
import {FilesAd} from '../../models/FilesAd';
import {ClaimsupdateComponent} from '../claimsupdate/claimsupdate.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {claims} from "../../models/claims";
import {ClaimserviceService} from "../../services/claimservice.service";
import {imguser} from "../../models/imguser";
import {TokenStorageService} from "../../auth/token-storage.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-product',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {

  Ad: Ad;
  retrieveResonse: FilesAd[];  u: User;

  base64Data: any[] = [];
  retrievedImage: any[] = [];public Img:any[]=[];        video :any[]=[]
  private retrieveResonsevideo: FilesAd[];
  private base64DataVideo: any[] = [];
  private retrievedVid: any[] = [];
  private retrieveResonseuser: imguser[];
 retrievedImageuser: any[] = [];

  constructor(private activ: ActivatedRoute,private AdServ: AdService, private dialog: MatDialog,private clm:ClaimserviceService,private us: UserService, private token: TokenStorageService) { }

  ngOnInit(): void {
    console.log(this.activ.snapshot.params['id']);
    this.AdServ.getAdById(this.activ.snapshot.params['id']).subscribe(data=> {//console.log(data);
      this.Ad=data as Ad;
      this.AdServ.getFiles().subscribe(res => {
        this.retrieveResonse = res as FilesAd[];
        for(let i of this.retrieveResonse)
        {this.base64Data.push([i.picByte,i.id,i.type]);
        }//console.log(this.base64Data)
        for(let t of this.base64Data)
        {if(t[2]=="image/jpeg")
          this.retrievedImage.push(['data:image/jpeg;base64,' + t[0],t[1]]);
        }
       // console.log(this.retrievedImage);
        for(let q of this.retrievedImage)
        {for(let img of this.Ad.imgads)
        {//console.log(img.type.indexOf("image"))
          if(q[1]==img.id)
        {this.Img.push(q[0]);//console.log(img.id + "   "+q[1]);
        }
     /*   else if(q[1]==img.id && img.type.indexOf("video")!=-1)
        {this.video.push(img.picByte);}*/
        }}

          this.AdServ.getVideo(this.Ad.adId).subscribe(data=>
          {this.retrieveResonsevideo=data; //console.log(this.retrieveResonsevideo)
            for(let i of this.retrieveResonsevideo)
            {//console.log(i.picByte)
              this.base64DataVideo.push([i.picByte,i.id,i.type]);
            }//console.log(this.base64DataVideo)
            for(let t of this.base64DataVideo)
            {//console.log(t);
              this.retrievedVid.push(['data:video/mp4;base64,' + t[0],t[1]]);
            }//console.log(this.retrievedVid);
            for(let q of this.retrievedVid)
            {this.video.push(q[0]);
            }//console.log(this.video);
          });

      }
      );

        this.retrieveResonseuser = this.Ad.us.imguser as imguser[];console.log(this.retrieveResonseuser);
        for(let t of this.retrieveResonseuser)
        {this.retrievedImageuser.push('data:image/jpeg;base64,' + t.picByte);console.log(this.retrievedImageuser);
        }

    });console.log(this.video);

  }

  // tslint:disable-next-line:typedef
  onCreate(){
    this.clm.idad = this.Ad.adId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(ClaimsupdateComponent, dialogConfig);
  }}
