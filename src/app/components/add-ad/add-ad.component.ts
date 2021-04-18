import { Component, OnInit } from '@angular/core';
import {Ad} from '../../models/Ad';
import {NgForm} from '@angular/forms';
import {AdService} from "../../services/ad.service";
import {Typead} from "../../enumeration/Typead";
import {TypeBatiment} from "../../enumeration/TypeBatiment";

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
  keys: string[] = [];  symbols = Typead;
  symbolsBat = TypeBatiment;

  constructor(private AdServ:AdService) {    this.keys = Object.keys(this.symbolsBat).filter(f => !isNaN(Number(f)));

  }
   p: Ad;
// tslint:disable-next-line:label-

  ngOnInit(): void {

  }

  PostAd(p: Ad) {
  }

  save(f: NgForm) {let p = <Ad>{ };

    console.log(f.value);
    const returnedTarget: Ad  = Object.assign(p, f.value);//convert the form to object in p
    console.log(p);
    this.AdServ.postAd(p).subscribe(data=>{console.log("success");
     });
  }

}
