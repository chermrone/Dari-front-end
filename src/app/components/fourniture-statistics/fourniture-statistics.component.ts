import { Component, OnInit } from '@angular/core';
import {FournitureAdServiceService} from '../../services/fourniture-ad-service.service';
import {DailyProfit} from '../../models/DailyProfit';
import {NgForm} from '@angular/forms';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import pluginDataLabels from 'chartjs-plugin-datalabels';
import * as moment from 'moment';

@Component({
  selector: 'app-fourniture-statistics',
  templateUrl: './fourniture-statistics.component.html',
  styleUrls: ['./fourniture-statistics.component.scss']
})
export class FournitureStatisticsComponent implements OnInit {
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barCharData: ChartDataSets[] = [
    { data: [], label: 'Daily Profits' }
  ];


  constructor(private  fournitureAdServiceService: FournitureAdServiceService) { }
  dateDebut: string ;
  dateFin: string;
  totalProfit: number;
  dates: string[];
  profits: number[];
  topSellers: string[];
  ngOnInit(): void {
    this.fournitureAdServiceService.getTotalProfit('2021-04-19', '2021-05-08').subscribe(
      (data) => { this.totalProfit = data; }
    );
    this.barCharData[0].data = [];
    this.fournitureAdServiceService.getDailyProfit('2021-04-19' , '2021-05-08').subscribe(
      dailyProfits => {
        dailyProfits.forEach(dailyProfit =>  this.barCharData[0].data.push(dailyProfit.profit));
        this.barChartLabels = dailyProfits.map(e => e.date);
      });
    this.fournitureAdServiceService.getTopSellers().subscribe(
      (data) => {this.topSellers = data; }
    );
  }
  public getData(f: NgForm): void{
    this.dateDebut = f.value.dateDebut;
    this.dateFin = f.value.dateFin;
    console.log(f.value);
    this.barCharData[0].data = [];
    this.fournitureAdServiceService.getDailyProfit(this.dateDebut , this.dateFin).subscribe(
        dailyProfits => {
          dailyProfits.forEach(dailyProfit =>  this.barCharData[0].data.push(dailyProfit.profit));
          this.barChartLabels = dailyProfits.map(e => e.date);
        });
  }

}
