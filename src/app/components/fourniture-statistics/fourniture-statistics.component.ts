import { Component, OnInit } from '@angular/core';
import {FournitureAdService} from '../../services/fourniture-ad-service.service';
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


  constructor(private  fournitureAdService: FournitureAdService) { }
  dateDebut: string ;
  dateFin: string;
  totalProfit: number;
  dates: string[];
  profits: number[];
  topSellers: string[];
  ngOnInit(): void {
    this.dateFin = new Date().toISOString().split('T')[0];
    console.log(this.dateFin);
    this.fournitureAdService.getTotalProfit('2021-04-19', this.dateFin).subscribe(
      (data) => { this.totalProfit = data; }
    );
    this.barCharData[0].data = [];
    this.fournitureAdService.getDailyProfit('2021-04-19' , this.dateFin).subscribe(
      dailyProfits => {
        dailyProfits.forEach(dailyProfit =>  this.barCharData[0].data.push(dailyProfit.profit));
        this.barChartLabels = dailyProfits.map(e => e.date);
      });
    this.fournitureAdService.getTopSellers().subscribe(
      (data) => {this.topSellers = data; }
    );
  }
  public getData(f: NgForm): void{
    this.dateDebut = f.value.dateDebut;
    this.dateFin = f.value.dateFin;
    // console.log(f.value);
    this.barCharData[0].data = [];
    this.fournitureAdService.getDailyProfit(this.dateDebut , this.dateFin).subscribe(
        dailyProfits => {
          dailyProfits.forEach(dailyProfit =>  this.barCharData[0].data.push(dailyProfit.profit));
          this.barChartLabels = dailyProfits.map(e => e.date);
        });
    this.fournitureAdService.getTotalProfit(this.dateDebut , this.dateFin).subscribe(
      (data) => { this.totalProfit = data; }
    );
  }

}
