import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import {AdService} from '../../services/ad.service';
import {Ad} from '../../models/Ad';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
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

  public Ads: Ad[] = [];
  public orderregions: string[] = [];
  public allcities: string[] = [];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public myMap: Map<string, number> = new Map<string, number>();

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'number of houses sold by region' }
  ];

  constructor(private as: AdService) { }

  ngOnInit(): void {
    this.as.getAd().subscribe(ad => {
      // affecting list of ads to this.Ads
      this.Ads = ad;
      for (let c of this.Ads) {
        this.allcities.push(c.city);
      }
      // sorting all cities
      this.allcities.sort((a, b) => a.localeCompare(b));
      console.log(this.allcities);

      // pushing cities name in list of cities
      for (let i = 0; i < this.Ads.length; i++) {

          // tslint:disable-next-line:triple-equals
          if (this.allcities[i] != this.allcities[i + 1]) {
            this.barChartLabels.push(this.allcities[i]);
            this.as.getByedHousesByRegion(this.allcities[i]).subscribe(r => {
              // assigning the result to barChartData[0].data (points of chart)
              this.barChartData[0].data.push(r as number);
            });
          }

      }

    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

 /* public randomize(): void {
    this.barChartLabels = [];
    this.barChartData[0].data = [];
    this.allcities = [];
    this.orderregions = [];
    this.as.getRegionsOrdredByBuyingAdsAsc().subscribe(r => {
      console.log(r);
      this.orderregions = r as string[];
      console.log(this.orderregions);
      for (let i = 0; i < this.orderregions.length; i++) {
        if (i < this.orderregions.length - 1) {
          // tslint:disable-next-line:triple-equals
          if (this.orderregions[i] != this.orderregions[i + 1]) {
            this.barChartLabels.push(this.orderregions[i]);
            this.as.getByedHousesByRegion(this.orderregions[i]).subscribe(data => {
              this.barChartData[0].data.push(data as number);
            });
          }
        }
      }
    });

  }*/

}
