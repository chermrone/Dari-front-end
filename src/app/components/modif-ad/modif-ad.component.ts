import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AdService} from "../../services/ad.service";
import {Ad} from "../../models/Ad";
import {NgForm} from "@angular/forms";
import {Typead} from "../../enumeration/Typead";
import {TypeBatiment} from "../../enumeration/TypeBatiment";

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

  ngOnInit(): void {
    if (this.AdServ.idAd != 0){
      this.AdServ.getAdById(this.AdServ.idAd).subscribe(data => {
        this.Ad = data as Ad;
        console.log(this.Ad);
      });
    }
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
    const returnedTarget: Ad = Object.assign(this.Ad, f.value); // convert the form to object in p
    console.log(this.Ad);
      console.log(this.Ad);
      this.AdServ.updateAd(this.Ad).subscribe(data => console.log(data));

    this.AdServ.idAd = 0;
    this.Ad = new Ad();
  }

  onclose(){
    this.matdialogref.close();
    this.AdServ.idAd = 0;
    this.Ad = new Ad();
  }

}
