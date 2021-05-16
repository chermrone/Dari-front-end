import { Component, OnInit } from '@angular/core';
import {AdService} from "../../services/ad.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent, MatChipList} from "@angular/material/chips";
import {Typead} from "../../enumeration/Typead";
import {TypeBatiment} from "../../enumeration/TypeBatiment";
import { Ad } from 'src/app/models/Ad';

@Component({
  selector: 'app-ad-key-search',
  templateUrl: './ad-key-search.component.html',
  styleUrls: ['./ad-key-search.component.scss']
})
export class AdKeySearchComponent implements OnInit {
  symbols = Typead;
  symbolsBat = TypeBatiment;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  keysBat = [];
  keysTyp = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  valu: string[] = [
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.valu.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit): void {
    const index = this.valu.indexOf(fruit);

    if (index >= 0) {
      this.valu.splice(index, 1);
    }
    this.msg=''
  }


  constructor(private adserv : AdService,private matdialogref: MatDialogRef<AdKeySearchComponent>,private route:Router) {
    this.city=['ariana', 'beja', 'ben arous', 'bizerte', 'gabes', 'gafsa', 'jendouba', 'karawen', 'gasrin', 'gbelli', 'kef', 'mahdia', 'manouba', 'mednine', 'mistir', 'nabeul', 'sfax', 'sidi bouzid', 'siliana', 'sousse', 'tataouine', 'tozeur', 'tunis', 'zaghouan'];
   console.log(this.city)
    }
Ad:Ad;
  ads:Ad[];
  ngOnInit(): void {
    this.keysBat = Object.keys(this.symbolsBat);
    this.keysTyp = Object.keys(this.symbols);
  }
verif:boolean=false;
city:string[]=[];
cityAdd:string='';batAdd=null;
  typeAdd=null;
msg='';
  searchAd() {
    for (let x of this.valu)
{
  for (let cit of this.city)
{if(x==cit)
  {this.cityAdd=cit;
  }
}

  for (let bat of this.keysBat)
  { if(x==bat)
  {this.batAdd=bat;
  }
  }


  for (let type of this.keysTyp)
  { if(x.toUpperCase()==type)
  {this.typeAdd=type;
  }
  }console.log(this.typeAdd)
if(this.typeAdd==null && this.cityAdd=='' && this.batAdd==null)
  this.msg="ERROR PLEASE ENTER CORRECTY"
}
    let price:number; let rooms:number;
if(this.msg=='')
{this.adserv.SearchCriteria(price,  this.cityAdd, rooms, this.typeAdd,
      this.batAdd).subscribe( data=>{this.ads=data as Ad[];this.adserv.ads=this.ads});
    this.matdialogref.close();
    this.route.navigate(['SearchAd']);}

  }
}
