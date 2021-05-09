import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FournitureAd} from '../../models/FournitureAd';
import {FournitureAdServiceService} from '../../services/fourniture-ad-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {AdService} from '../../services/ad.service';
import {FilesAd} from '../../models/FilesAd';
import {Gallery, GalleryItem, ImageItem, ImageSize, ThumbnailsPosition} from 'ng-gallery';
import {Lightbox} from 'ng-gallery/lightbox';
import {JavascriptViewer} from '@3dweb/360javascriptviewer';
import {NgImageSliderComponent} from 'ng-image-slider';

@Component({
  selector: 'app-modif-fourniture-ad',
  templateUrl: './modif-fourniture-ad.component.html',
  styleUrls: ['./modif-fourniture-ad.component.scss']
})
export class ModifFournitureAdComponent implements OnInit {
    regions = ['Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili', 'Gouvernorat du Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'];
   constructor(private matdialogref: MatDialogRef<ModifFournitureAdComponent>,
               private fournitureAdServiceService: FournitureAdServiceService , public  gallery: Gallery, public lightbox: Lightbox) {}
  hide = true;
  @Input() AD: FournitureAd;
  listVideo: string[] = [];
  items: GalleryItem[];
  imageObject = data;
  @ViewChild('nav') nav: NgImageSliderComponent;
  ngOnInit(): void {
    // console.log('data :' + data);
    const
      imageExtensions = ['.bmp', '.gif', '.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.apng', '.wmf', '.ico', '.jif', '.jfif',  '.svg', '.svgz', '.xbm'];
    const
      videoExtensions = ['mov', 'mp4', 'avi', 'wmf', 'fly', 'webm'];
    this.AD.localFile.forEach((file) => {
      // console.log(file.path);
      imageExtensions.forEach((extension) => {
        const filler = {image : this.getFilePath(file.path) , thumbImage : this.getFilePath(file.path)};
        if (file.path.indexOf(extension) > 0 && !data.includes(filler)) {
          // console.log(filler);
          data.push(filler);
        }
      });
      videoExtensions.forEach((extension) => {
        const filler2 = {video : this.getFilePath(file.path) , title : 'video de ' + this.AD.nameFa};
        if (file.path.indexOf(extension) > 0 && !data.includes(filler2)) {
          data.push(filler2);
        }
      });
    });
    // this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));

    /** Lightbox Example */

      // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }

  onsubmit(f: NgForm): void {
    /*if (this.AdServ.idAd === 0){
      console.log(f.value);
      const returnedTarget: Ad = Object.assign(this.Ad, f.value); // convert the form to object in p
      console.log(this.Ad);
      this.AdServ.postAd(this.Ad).subscribe(data => console.log(data));
    }
    else{*/
    console.log(f.value);

  }

  onclose(): void{
    this.matdialogref.close();
  }

  update(f: any): void{
    // const returnedTarget: FournitureAd = Object.assign(this.AD, f.value); // convert the form to object in p
    console.log(this.AD);
    this.fournitureAdServiceService.updateAd(this.AD).subscribe(data3 => console.log(data3));

  }
  // file path
  getFilePath(filePath): string {
    const startIndex = filePath.indexOf('\assets');
    const endIndex = filePath.length;
    return filePath.substring(startIndex, endIndex);
  }
  vider(): void{
    data = [];
  }
  delete(event): void{
    this.nav.close();
    if (this.imageObject[event].image){
      console.log('image : ' + this.imageObject[event].image);
      this.fournitureAdServiceService.deleteFile(this.imageObject[event].image).subscribe(
        () => console.log('img deleted')
      );
    }
    else if (this.imageObject[event].video){
      console.log('video : ' + this.imageObject[event].video);
      this.fournitureAdServiceService.deleteFile(this.imageObject[event].video).subscribe(
        () => console.log('video deleted')
      );
    }
  }
}
let data = [];
