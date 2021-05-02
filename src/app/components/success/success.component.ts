import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SubscriptionOrderService} from '../../services/subscription-order.service';
import {SubscriptionOrder} from '../../models/subscriptionOrder';
import {TokenStorageService} from '../../auth/token-storage.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  @ViewChild('couponPage', { static: true }) couponPage: ElementRef;

  subscriptionOrder: SubscriptionOrder = new SubscriptionOrder();
  subscordList: SubscriptionOrder[] = [];
  solPremium: SubscriptionOrder[] = [];
  u: User = new User();
  username: string;

  constructor(private token: TokenStorageService, private us: UserService, private sos: SubscriptionOrderService) { }

  ngOnInit(): void {
    this.username = this.token.getUsername();
    // get the id of user
    this.us.getUserByUserName(this.username).subscribe(user => {
      this.u = user;
      // subscription premium
      this.sos.UpgradePremium(this.u.idUser, this.subscriptionOrder).subscribe(data => {
        },
        error => console.log(error));

      // get list of subscriptionorders of this user
      this.sos.getSubscriptionOrdersPremiumByUser(this.u.idUser).subscribe( so => {
        this.subscordList = so as SubscriptionOrder[];
        console.log(this.subscordList);
      });

    });
  }

  generatePDF() {
    // tslint:disable-next-line:prefer-const
    let data = document.getElementById('table');
    html2canvas(data).then(canvas => {
      // tslint:disable-next-line:prefer-const
      let imgWidth = 208;
      // tslint:disable-next-line:prefer-const
      let imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      // const pdf = new jspdf('p', 'mm', 'a4');
      const pdf: jsPDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('newPDF.pdf');
    });
  }

  /*generatePDF(): void {
    const DATA = this.couponPage.nativeElement;
    const doc: jsPDF = new jsPDF('p', 'mm', 'a4');
    doc.html(DATA, {
      callback: (doc) => {
        doc.output('dataurlnewwindow');
      }
    });
  }*/

}
