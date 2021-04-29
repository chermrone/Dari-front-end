import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import {AdService} from '../../services/ad.service';
import {Ad} from '../../models/Ad';
import {NgForm} from '@angular/forms';

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
  public allcities: string[] = [];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'number of houses sold by region' }
  ];

  /**********************************get houses by region and min or max ****************************************/
  public barChartOptions1: ChartOptions = {
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

  public barCharData1: ChartDataSets[] = [
    { data: [], label: 'number of houses sold by region and max price' }
  ];

  /**********************************get houses by region and min or max ****************************************/
  public barChartOptions2: ChartOptions = {
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


  public barCharData2: ChartDataSets[] = [
    { data: [], label: 'number of houses sold by region in less the a period' }
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

      // pushing cities name in list of cities
      for (let i = 0; i < this.Ads.length; i++) {

          // tslint:disable-next-line:triple-equals
          if (this.allcities[i] != this.allcities[i + 1]) {
            this.barChartLabels.push(this.allcities[i]);
            this.as.getByedHousesByRegion(this.allcities[i]).subscribe(r => {
              // assigning the result to barChartData[0].data (points of chart)
              this.barChartData[0].data.push(r as number);
            });
            this.as.getByedHousesByRegionAndMaxPrice(this.allcities[i], 300000000000).subscribe(r => {
              this.barCharData1[0].data.push(r as number);
            });
            this.as.getByedHousesByRegionAndperiod(this.allcities[i], 30).subscribe(r => {
                this.barCharData2[0].data.push(r as number);
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

  public OnSubmit(f: NgForm) {
    if (f.value.maxmin === 'max') {
      this.barCharData1[0].data = [];
      this.allcities.forEach(c => {
        this.as.getByedHousesByRegionAndMaxPrice(c, f.value.price).subscribe(r => {
          this.barCharData1[0].data.push(r as number);
        });
      });
    }
    else {
      this.barCharData1[0].data = [];
      this.barCharData1[0].label = '';
      this.allcities.forEach(c => {
        this.as.getByedHousesByRegionAndMinPrice(c, f.value.price).subscribe(r => {
          this.barCharData1[0].data.push(r as number);
          this.barCharData1[0].label = 'number of houses sold by region and min price';
        });
      });
    }
  }

  public OnSubmit1(f1: NgForm){
    console.log(f1.value.period);
    this.barCharData2[0].data = [];
    this.allcities.forEach(c => {
      this.as.getByedHousesByRegionAndperiod(c, f1.value.period).subscribe(r => {
        this.barCharData2[0].data.push(r as number);
      });
    });
  }

}
