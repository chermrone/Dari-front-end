import { Component, OnInit } from '@angular/core';

import {MatDialogRef} from "@angular/material/dialog";

import {NgForm} from "@angular/forms";
import {claims} from "../../models/claims";
import {ClaimserviceService} from "../../services/claimservice.service";
import {AdService} from "../../services/ad.service";
import {Ad} from "../../models/Ad";

@Component({
  selector: 'app-claimsupdate',
  templateUrl: './claimsupdate.component.html',
  styleUrls: ['./claimsupdate.component.scss']
})
export class ClaimsupdateComponent implements OnInit {
  hide = true;
  claim: claims = new claims();

ad:Ad=new Ad();
  constructor(public matdialogref: MatDialogRef<ClaimsupdateComponent>, private cl: ClaimserviceService, private  add:AdService) { }

  ngOnInit(): void {
    if (this.cl.clmId != 0) {

      console.log(this.cl.clmId);
      this.cl.getClaimById(this.cl.clmId).subscribe(claim1 => {
        this.claim = claim1;

        console.log(this.claim);

      });

    }}
  // tslint:disable-next-line:typedef
  onsubmit(f: NgForm) {
    if (this.cl.clmId === 0){
      this.add.getAdById(this.cl.idad).subscribe(data =>{
        this.ad = data as Ad ;
      });
      console.log(f.value);
      this.claim.typeClm = f.value.typeClm;
      this.claim.dateOfClm = f.value.dateOfClm;
      this.claim.content = f.value.content;
      this.claim.objectOfClm = f.value.objectOfClm;
      //this.claim.clmId = f.value.clmId;
      this.claim.ad =this.ad;
      this.cl.addclaim(this.claim).subscribe(data => console.log(data));
    }
    else{
      console.log(f.value);
      this.claim.typeClm = f.value.typeClm;
      this.claim.dateOfClm = f.value.dateOfClm;
      this.claim.content = f.value.content;
      this.claim.objectOfClm = f.value.objectOfClm;
      //this.claim.clmId = f.value.clmId;

      console.log(this.claim);
      this.cl.updateClaim(this.claim).subscribe(data => console.log(data));
    }
    this.cl.clmId = 0;
    this.claim = new claims();
  }

  // tslint:disable-next-line:typedef
  onCancel() {
    this.matdialogref.close();
    this.cl.clmId = 0;
    this.claim = new claims();
  }
}
