import { Component, OnInit } from '@angular/core';
import {Ad} from '../../models/Ad';
import {NgForm} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Typead} from '../../enumeration/Typead';
import {TypeBatiment} from '../../enumeration/TypeBatiment';
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {
  keysBat = [];  keysTyp = [];
  symbols = Typead;
  symbolsBat = TypeBatiment;

estimationPrice: any; estimationDuration: any;
  constructor(private AdServ: AdService) {    this.keysBat = Object.keys(this.symbolsBat);
                                             this.keysTyp = Object.keys(this.symbols);

  }
   p: Ad;
// tslint:disable-next-line:label-

  ngOnInit(): void {

  }

  PostAd(f: NgForm) {const p = { } as Ad;

                     console.log(f.value);
                     const returnedTarget: Ad  = Object.assign(p, f.value); // convert the form to object in p
                     console.log(p);
                     this.AdServ.postAd(p).subscribe(data => {console.log('success');
    });
  }

  save(f: NgForm) {
  }

  // tslint:disable-next-line:typedef
  EstimationPrice(f: NgForm)  {const p = { } as Ad;
                               const returnedTarget: Ad  = Object.assign(p, f.value); // convert the form to object in p
                               console.log(p);
                               this.AdServ.EstimationPrice(p).subscribe(data => {
      console.log('success'); this.estimationPrice = data; console.log(data);
    });
  }

  EstimationDuration(f: NgForm) {
    const p = { } as Ad;
    const returnedTarget: Ad  = Object.assign(p, f.value); // convert the form to object in p
    this.AdServ.EstimationDuration(p).subscribe(data => {
      console.log('success'); this.estimationDuration = data; console.log(data);
    });
  }
}
