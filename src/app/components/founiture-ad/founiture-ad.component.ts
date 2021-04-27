import {Component, OnInit} from '@angular/core';
import {FournitureAd} from '../../models/FournitureAd';
import {FournitureAdServiceService} from '../../services/fourniture-ad-service.service';

@Component({
  selector: 'app-founiture-ad',
  templateUrl: './founiture-ad.component.html',
  styleUrls: ['./founiture-ad.component.scss']
})
export class FounitureAdComponent implements OnInit {
  list: FournitureAd[];

  constructor(private fournitureAdServiceService: FournitureAdServiceService) {
  }

  ngOnInit(): void {
    this.fournitureAdServiceService.getAll().subscribe(
      (result) => {
        this.list = result;
      }
    );
  }

  getFilePath(ad): string {
    if (ad.localFile[0]) {
      const filePath = ad.localFile[0].path;
      const startIndex = filePath.indexOf('\assets');
      const endIndex = filePath.length;
      console.log(filePath.substring(startIndex, endIndex));
      return filePath.substring(startIndex, endIndex);
    }
    return '';
  }

}
