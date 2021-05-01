import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AdService} from "../../services/ad.service";

@Component({
  selector: 'app-situation-ad',
  templateUrl: './situation-ad.component.html',
  styleUrls: ['./situation-ad.component.scss']
})
export class SituationAdComponent implements OnInit {

  constructor(private matdialogref: MatDialogRef<SituationAdComponent>, private AdServ: AdService) { }
msg:string
  ngOnInit(): void {
    if (this.AdServ.idAd != 0){
      this.AdServ.GetSuggestionAd(this.AdServ.idAd).subscribe(data=> this.msg=data)

    }
  }

}
