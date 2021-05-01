import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Ad } from 'src/app/models/Ad';
import {AdService} from "../../services/ad.service";
import {FilesAd} from "../../models/FilesAd";

@Component({
  selector: 'app-product',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
Ad:Ad;
  retrieveResonse: FilesAd[];
  base64Data: any[] = [];
  retrievedImage: any[] = [];public Img:any[]=[]
  constructor(private activ:ActivatedRoute,private AdServ: AdService) { }

  ngOnInit(): void {
    console.log(this.activ.snapshot.params['id']);
    this.AdServ.getAdById(this.activ.snapshot.params['id']).subscribe(data=> {console.log(data);
      this.Ad=data as Ad;
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

    });
  }

}
