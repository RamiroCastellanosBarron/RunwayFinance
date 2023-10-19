import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { forkJoin } from 'rxjs';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { EndOfDayService } from 'src/app/core/services/end-of-day.service';
import { DividendYield } from 'src/app/shared/models/dividend-yield';
import { EndOfDay, EndOfDayMeta, EndOfDayParams } from 'src/app/shared/models/end-of-day';
import { Daily, DailyParams, Meta } from 'src/app/shared/models/fundamentals';
import { InterdayPrice, InterdayPriceParams } from 'src/app/shared/models/interday-price';
import { formatDate } from 'src/app/shared/utils/util';
import * as d3 from 'd3';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  ticker: string;
  daily?: Daily[];
  meta?: Meta;
  dailyParams = new DailyParams();
  highestClose?: number;
  lowestClose?: number;
  dividendYield?: DividendYield;
  endOfDay?: EndOfDay[];
  endOfDayMeta?: EndOfDayMeta;
  yearLow?:number;
  yearHigh?:number;
  dayHigh?:number;
  dayLow?:number;
  dayVolume?:number;
  dayClose?:number;
  chartData1y: ChartData[] = [];
  chartData5y: ChartData[] = [];
  chartData1d: ChartData[] = [];
  chartData5d: ChartData[] = [];
  chartData1m: ChartData[] = [];
  chartData6m: ChartData[] = [];
  minYValue?: number;
  maxYValue?: number;
  yScaleMin1y?: number;
  yScaleMax1y?: number;
  yScaleMin5y?: number;
  yScaleMax5y?: number;
  yScaleMax1d?: number;
  yScaleMin1d?: number;
  yScaleMax5d?: number;
  yScaleMin5d?: number;
  yScaleMax1m?: number;
  yScaleMin1m?: number;
  yScaleMax6m?: number;
  yScaleMin6m?: number;
  xAxisTicks1d: any[] = []
  xAxisTicks5d: any[] = []
  xAxisTicks5y: any[] = []
  xAxisTicks1y: any[] = []
  xAxisTicks1m: any[] = []
  xAxisTicks6m: any[] = []

  constructor(private companiesService: CompaniesService, private route: ActivatedRoute,
    private endOfDayService: EndOfDayService) {
    this.ticker = this.route.snapshot.paramMap.get('ticker')!;
    this.dailyParams = this.companiesService.getDailyParams();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticker = params.get('ticker')!;
    });
    this.loadData();
    this.loadChartData1y();
    this.loadChartData5y();
    this.loadChartData1m();
    this.loadChartData6m();
    this.loadInterdayPrices1d();
    this.loadInterdayPrices5d();
  }

  loadData() {
    forkJoin([
      this.loadDaily(),
      this.loadMeta(),
      this.loadDividendYield(),
      this.loadEndOfDay(),
      this.loadEndOfDayMeta(),
      this.loadYearRange(),
      this.loadDayInfo(),
    ]).subscribe({
      next: ([
        daily,
        meta,
        dividendYield,
        endOfDay,
        endOfDayMeta,
        yearRange,
        dayInfo,
      ]) => {
        this.daily = daily;
        this.meta = meta;
        this.dividendYield = dividendYield;
        this.endOfDay = endOfDay;
        this.endOfDayMeta = endOfDayMeta;
        this.yearLow = yearRange[0].low;
        this.yearHigh = yearRange[0].high;
        this.dayHigh = dayInfo[0].high;
        this.dayLow = dayInfo[0].low;
        this.dayVolume = dayInfo[0].volume;
        this.dayClose = dayInfo[0].close;
        this.yScaleMin1y = Math.round(this.yearLow) - 5;
        this.yScaleMax1y = Math.round(this.yearHigh);
      }
    })
  }

  loadChartData5y() {
    const params = new EndOfDayParams();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 365*5);

    params.startDate = formatDate(startDate);
    params.resampleFreq = 'monthly';
    this.endOfDayService.setEndOfDayParams(params);

    this.endOfDayService.getEndOfDay(this.ticker).subscribe({
      next: response => {
        const seriesData = response.map((item: any) => {
            return {
                name: new Date(item.date).toLocaleDateString(),
                value: item.close
            };
        });

        const firstDate = seriesData[0].name;
        const middleDate = seriesData[Math.floor(seriesData.length / 2)].name;
        const lastDate = seriesData[seriesData.length - 1].name;

        this.xAxisTicks5y.push(firstDate, middleDate, lastDate);
        const closeValues = seriesData.map(item => item.value);

        const lowestClose = Math.min(...closeValues);
        const highestClose = Math.max(...closeValues);
        this.yScaleMax5y = highestClose;
        this.yScaleMin5y = lowestClose-5;

        this.chartData5y.push({
          name: this.ticker,
          series: seriesData
        });

        console.log('5 years',this.xAxisTicks5y);
        console.log('5 years min y', this.yScaleMin5y, 'max', this.yScaleMax5y);
      }
    })
  }

  loadChartData1y() {
    const params = new EndOfDayParams();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 365);

    params.startDate = formatDate(startDate);
    params.resampleFreq = 'weekly';
    this.endOfDayService.setEndOfDayParams(params);

    this.endOfDayService.getEndOfDay(this.ticker).subscribe({
      next: response => {
        const seriesData = response.map((item: any) => {
            return {
                name: new Date(item.date).toLocaleDateString(),
                value: item.close
            };
        });

        const firstDate = seriesData[0].name;
        const middleDate = seriesData[Math.floor(seriesData.length / 2)].name;
        const lastDate = seriesData[seriesData.length - 1].name;


        this.xAxisTicks1y.push(firstDate, middleDate, lastDate);

        this.chartData1y.push({
            name: this.ticker,
            series: seriesData
        });

        console.log('1 year', this.xAxisTicks1y);
        console.log('1 year min y', this.yScaleMin1y, 'max', this.yScaleMax1y);
      }
    })
  }

  loadChartData6m() {
    const params = new EndOfDayParams();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 180);

    params.startDate = formatDate(startDate);
    params.resampleFreq = 'daily';
    this.endOfDayService.setEndOfDayParams(params);

    this.endOfDayService.getEndOfDay(this.ticker).subscribe({
      next: response => {
        const seriesData = response.map((item: any) => {
            return {
                name: new Date(item.date).toLocaleDateString(),
                value: item.close
            };
        });

        const firstDate = seriesData[0].name;
        const middleDate = seriesData[Math.floor(seriesData.length / 2)].name;
        const lastDate = seriesData[seriesData.length - 1].name;

        this.xAxisTicks6m.push(firstDate, middleDate, lastDate);
        const closeValues = seriesData.map(item => item.value);

        const lowestClose = Math.min(...closeValues);
        const highestClose = Math.max(...closeValues);
        this.yScaleMax6m = highestClose;
        this.yScaleMin6m = lowestClose-5;

        this.chartData6m.push({
          name: this.ticker,
          series: seriesData
        });

        console.log('6 months', this.xAxisTicks6m);
        console.log('6 months min y', this.yScaleMin6m, 'max', this.yScaleMax6m);
      }
    })
  }

  loadChartData1m() {
    const params = new EndOfDayParams();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);

    params.startDate = formatDate(startDate);
    params.resampleFreq = 'daily';
    this.endOfDayService.setEndOfDayParams(params);

    this.endOfDayService.getEndOfDay(this.ticker).subscribe({
      next: response => {
        const seriesData = response.map((item: any) => {
            return {
                name: new Date(item.date).toLocaleDateString(),
                value: item.close
            };
        });

        const firstDate = seriesData[0].name;
        const middleDate = seriesData[Math.floor(seriesData.length / 2)].name;
        const lastDate = seriesData[seriesData.length - 1].name;

        this.xAxisTicks1m.push(firstDate, middleDate, lastDate);

        const closeValues = seriesData.map(item => item.value);

        const lowestClose = Math.min(...closeValues);
        const highestClose = Math.max(...closeValues);
        this.yScaleMax1m = highestClose;
        this.yScaleMin1m = lowestClose-2;

        this.chartData1m.push({
          name: this.ticker,
          series: seriesData
        });

        console.log('1 month', this.xAxisTicks1m);
        console.log('1 month min y', this.yScaleMin1m, 'max', this.yScaleMax1m);
      }
    })
  }

  loadInterdayPrices5d() {
    const params = new EndOfDayParams();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 5);

    params.startDate = formatDate(startDate);
    params.resampleFreq = 'daily';
    this.endOfDayService.setEndOfDayParams(params);

    this.endOfDayService.getEndOfDay(this.ticker).subscribe({
      next: response => {
        const seriesData = response.map((item: any) => {
            return {
                name: new Date(item.date).toLocaleDateString(),
                value: item.close
            };
        });

        const firstDate = seriesData[0].name;
        const middleDate = seriesData[Math.floor(seriesData.length / 2)].name;
        const lastDate = seriesData[seriesData.length - 1].name;

        this.xAxisTicks5d.push(firstDate, middleDate, lastDate);

        const closeValues = seriesData.map(item => item.value);

        const lowestClose = Math.min(...closeValues);
        const highestClose = Math.max(...closeValues);
        this.yScaleMax5d = highestClose;
        this.yScaleMin5d = lowestClose-2;

        this.chartData5d.push({
          name: this.ticker,
          series: seriesData
        });

        console.log('5 days', this.xAxisTicks5d);
        console.log('5 days min y', this.yScaleMin5d, 'max', this.yScaleMax5d);
      }
    })
  }

  loadInterdayPrices1d() {
    const params = new InterdayPriceParams();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate.getFullYear(), 0, 1);

    params.requestFreq = '30min';

    this.companiesService.setInterdayPriceParams(params);

    this.companiesService.getInterdayPrices(this.ticker).subscribe({
      next: response => {
        const seriesData = response.map((item: InterdayPrice) => {
          const date = new Date(item.date);
          const formattedDate = d3.timeFormat('%I:%M %p')(date);
            return {
              name: formattedDate,
              value: item.close
            };
        });

        const firstDate = seriesData[0].name;
        const middleDate = seriesData[Math.floor(seriesData.length / 2)].name;
        const lastDate = seriesData[seriesData.length - 1].name;

        this.xAxisTicks1d.push(firstDate, middleDate, lastDate);

        const closeValues = seriesData.map(item => item.value);

        const lowestClose = Math.min(...closeValues);
        const highestClose = Math.max(...closeValues);
        this.yScaleMax1d = highestClose;
        this.yScaleMin1d = lowestClose-2;

        this.chartData1d.push({
          name: this.ticker,
          series: seriesData
        });

        console.log('1 day', this.xAxisTicks1d);
        console.log('1 day min y', this.yScaleMin1d, 'max', this.yScaleMax1d);
      }
    })
  }

  loadEndOfDay() {
    return this.endOfDayService.getEndOfDay(this.ticker);
  }

  loadYearRange() {
    const params = new EndOfDayParams();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate.getFullYear(), 0, 1);

    params.startDate = formatDate(startDate);
    params.resampleFreq = 'annually';
    this.endOfDayService.setEndOfDayParams(params);
    return this.endOfDayService.getEndOfDay(this.ticker);
  }

  loadDayInfo() {
    const params = new EndOfDayParams();

    params.resampleFreq = 'daily';
    this.endOfDayService.setEndOfDayParams(params);

    return this.endOfDayService.getEndOfDay(this.ticker);
  }

  loadEndOfDayMeta() {
    return this.endOfDayService.getEndOfDayMeta(this.ticker);
  }

  loadDaily() {
    const params = new DailyParams();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate.getFullYear(), 0, 1);

    params.startDate = startDate;
    params.endDate = endDate;

    this.companiesService.setDailyParams(params);

    return this.companiesService.getDaily(this.ticker);
  }

  loadInterdayPrices() {
    const params = new InterdayPriceParams();

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0);

    const startDate = new Date(endDate.getFullYear(), 0, 1);

    params.startDate = formatDate(startDate);
    params.endDate = formatDate(endDate);

    this.companiesService.setInterdayPriceParams(params);

    return this.companiesService.getInterdayPrices(this.ticker);
  }

  loadMeta() {
    return this.companiesService.getMeta(this.ticker);
  }

  loadDividendYield() {
    return this.companiesService.getDividendYield(this.ticker);
  }

  view: [number, number] = [700,400]

  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'X Label';
  showYAxisLabel = false;
  yAxisLabel = 'Y Label';
  legendPosition = LegendPosition.Below;

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: '',
    selectable: false,
    group: ScaleType.Time,
  }

  dateTickFormatting(date: any): string {
    // Depending on your data granularity you can adjust this.
    return d3.timeFormat('%I:%M %p')(new Date(date));
  }

}

interface ChartData {
  name: string;
  series: {
      name: string;
      value: number;
  }[];
}
