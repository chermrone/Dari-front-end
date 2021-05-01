import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AdService} from "../../services/ad.service";
import {Ad} from "../../models/Ad";
import {NgForm} from "@angular/forms";
import {Typead} from "../../enumeration/Typead";
import {TypeBatiment} from "../../enumeration/TypeBatiment";
import {FilesAd} from "../../models/FilesAd";

@Component({
  selector: 'app-modif-ad',
  templateUrl: './modif-ad.component.html',
  styleUrls: ['./modif-ad.component.scss']
})
export class ModifAdComponent implements OnInit {

  constructor(private matdialogref: MatDialogRef<ModifAdComponent>, private AdServ: AdService) { this.keysBat = Object.keys(this.symbolsBat);
    this.keysTyp = Object.keys(this.symbols); }
  hide = true;
  Ad: Ad = new Ad();
  type = '';
  keysBat = [];
  keysTyp = [];
  symbols = Typead;
  symbolsBat = TypeBatiment;
  retrieveResonse: FilesAd[];
  base64Data: any[] = [];
  retrievedImage: any[] = [];public Img:any[]=[]
  ngOnInit(): void {
    if (this.AdServ.idAd != 0){

      this.AdServ.getAdById(this.AdServ.idAd).subscribe(data => {
        this.Ad = data as Ad;
        console.log(this.Ad);
        this.AdServ.getFiles().subscribe(res => {
          this.retrieveResonse = res as FilesAd[];
          for(let i of this.retrieveResonse)
          {this.base64Data.push([i.picByte,i.id]); console.log(this.base64Data);
          }
          for(let t of this.base64Data)
          {this.retrievedImage.push(['data:image/jpeg;base64,' + t[0],t[1]]);console.log(this.retrievedImage);
          }
          for(let img of this.Ad.imgads)
        {for(let q of this.retrievedImage)
        {if(q[1]==img.id)
        {this.Img.push(q[0]);console.log(img.id + "   "+q[1]);}
        }}}
        );

      });}console.log("start from here img");

  console.log(this.Img);
  }

  onsubmit(f: NgForm) {
    /*if (this.AdServ.idAd === 0){
      console.log(f.value);
      const returnedTarget: Ad = Object.assign(this.Ad, f.value); // convert the form to object in p
      console.log(this.Ad);
      this.AdServ.postAd(this.Ad).subscribe(data => console.log(data));
    }
    else{*/
      console.log(f.value);

  }

  onclose(){
    this.matdialogref.close();
    this.AdServ.idAd = 0;
    this.Ad = new Ad();
  }

  update(f: any) {
    const returnedTarget: Ad = Object.assign(this.Ad, f.value); // convert the form to object in p
    console.log(this.Ad);
    this.AdServ.updateAd(this.Ad).subscribe(data => console.log(data));
    this.AdServ.idAd = 0;
    this.Ad = new Ad();

  }

  delete(fElement) {

    for(let q of this.retrievedImage)
      if(q[0]==fElement)
      {this.AdServ.deleteImgById(q[1]).subscribe(data => console.log("success"));
    window.location.reload();}

  }
}
