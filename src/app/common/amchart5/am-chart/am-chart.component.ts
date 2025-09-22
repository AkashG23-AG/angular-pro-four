import { Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-am-chart',
  template: `<div #chartContainer style="width: 100%; height: 400px;"></div>`,
})
export class AmChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) chartDiv!: ElementRef<HTMLDivElement>;

  @Input() chartType: 'XYChart' | 'PieChart' = 'XYChart';
  @Input() seriesType: 'ColumnSeries' | 'LineSeries' | 'PieSeries' = 'ColumnSeries';
  @Input() data: any[] = [];
  @Input() xField: string = 'category';
  @Input() yField: string = 'value';

  private root!: am5.Root;

  ngAfterViewInit(): void {
    // ✅ ensure chartDiv exists
    if (!this.chartDiv?.nativeElement) {
      console.error('Chart container not found');
      return;
    }

    this.root = am5.Root.new(this.chartDiv.nativeElement);
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    if (this.chartType === 'XYChart') {
      let chart = this.root.container.children.push(
        am5xy.XYChart.new(this.root, { layout: this.root.verticalLayout })
      );

      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(this.root, {
          categoryField: this.xField,
          renderer: am5xy.AxisRendererX.new(this.root, {}),
        })
      );

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(this.root, {
          renderer: am5xy.AxisRendererY.new(this.root, {}),
        })
      );

      xAxis.data.setAll(this.data);

      let series: am5xy.ColumnSeries | am5xy.LineSeries | undefined;

      if (this.seriesType === 'ColumnSeries') {
        series = chart.series.push(
          am5xy.ColumnSeries.new(this.root, {
            name: "Series",
            xAxis,
            yAxis,
            valueYField: this.yField,
            categoryXField: this.xField,
          })
        );
      } else if (this.seriesType === 'LineSeries') {
        series = chart.series.push(
          am5xy.LineSeries.new(this.root, {
            name: "Series",
            xAxis,
            yAxis,
            valueYField: this.yField,
            categoryXField: this.xField,
          })
        );
      }

      series?.data.setAll(this.data);
    }

    if (this.chartType === 'PieChart') {
      let chart = this.root.container.children.push(
        am5percent.PieChart.new(this.root, { layout: this.root.verticalLayout })
      );

      if (this.seriesType === 'PieSeries') {
        let pieSeries = chart.series.push(
          am5percent.PieSeries.new(this.root, {
            valueField: this.yField,
            categoryField: this.xField,
          })
        );
        pieSeries.data.setAll(this.data);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.root) {
      this.root.dispose();
    }
  }
}
