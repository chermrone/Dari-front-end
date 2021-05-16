import {Component, Input, OnInit, ChangeDetectionStrategy , ViewChild} from '@angular/core';
import {FournitureAd} from '../../models/FournitureAd';
import {JavascriptViewer} from '@3dweb/360javascriptviewer';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/ShoppingCart';

@Component({
  selector: 'app-founiture-ad-details',
  templateUrl: './founiture-ad-details.component.html',
  styleUrls: ['./founiture-ad-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FounitureAdDetailsComponent implements OnInit {
  @Input() ad: FournitureAd;
  listVideo: string[] = [];
  items: GalleryItem[];
  imageData = data;
  imageObject = data2;
  shoppingCart: ShoppingCart = null;
  constructor(
    public gallery: Gallery, 
    public lightbox: Lightbox,
    public shoppingCartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    // console.log('data :' + data);
    const
      imageExtensions = ['.bmp', '.gif', '.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.apng', '.wmf', '.ico', '.jif', '.jfif',  '.svg', '.svgz', '.xbm'];
    const
      videoExtensions = ['mov', 'mp4', 'avi', 'wmf', 'fly', 'webm'];
    this.ad.localFile.forEach((file) => {
      // console.log(file.path);
      imageExtensions.forEach((extension) => {
        const filler = {srcUrl : this.getFilePath(file.path) , previewUrl : this.getFilePath(file.path)};
        if (file.path.indexOf(extension) > 0 && !data.includes(filler)) {
          // console.log(filler);
          data.push(filler);
        }
      });
      videoExtensions.forEach((extension) => {
        const filler2 = {video : this.getFilePath(file.path) , title : 'video de ' + this.ad.nameFa};
        if (file.path.indexOf(extension) > 0 && !data.includes(filler2)) {
          data2.push(filler2);
        }
      });
    });
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));
      // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
    this.shoppingCartService.shoppingCart.subscribe(
      (data) => {
        this.shoppingCart = data;
        console.log("shopping cart in fourniture-ad details component:"+JSON.stringify(data))
      }
    )
  }

  updateCart(fa:FournitureAd): void{
    this.shoppingCart.fournitureAds.push(fa);
    const AuthUsername = sessionStorage.getItem("AuthUsername");
    this.shoppingCart.us.userName = AuthUsername
    if(this.shoppingCart.shoppingCartId){
      this.shoppingCartService.updateCart(this.shoppingCart).subscribe(
        (data) => {
          const username = sessionStorage.getItem("AuthUsername")
          this.shoppingCartService.updateValue(username,data)
          console.log("shopping cart update result:"+JSON.stringify(data));
        }
      )
    }else{
      this.shoppingCartService.createCart(this.shoppingCart).subscribe(
        (data) => {
          const username = sessionStorage.getItem("AuthUsername")
          this.shoppingCartService.updateValue(username,data)
          console.log("shopping cart create result:"+JSON.stringify(data));
        }
      )      
    }

  }

  // file path
  getFilePath(filePath): string {
    const startIndex = filePath.indexOf('\assets');
    const endIndex = filePath.length;
    return filePath.substring(startIndex, endIndex);
  }
  vider(): void{
    data = [];
    data2 = [];
  }
}
let data = [];
let data2 = [];

