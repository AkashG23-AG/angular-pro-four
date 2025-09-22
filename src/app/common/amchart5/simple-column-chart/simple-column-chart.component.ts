// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-simple-column-chart',
//   templateUrl: './simple-column-chart.component.html',
//   styleUrls: ['./simple-column-chart.component.scss']
// })
// export class SimpleColumnChartComponent {

// }

import {
  Component,
  OnDestroy,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  HostBinding,
  Output,
  EventEmitter,
  SimpleChanges,
  AfterViewInit,
  Inject,
  NgZone,
  PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: "app-simple-column-chart",
    templateUrl: './simple-column-chart.component.html',
  styleUrls: ['./simple-column-chart.component.scss'],
  // template: `<div [id]="chartPropertiesObject?.chartId" class="grow" [style.height.px]="chartHeight"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleColumnChartComponent
  implements AfterViewInit, OnDestroy, OnChanges {
  @HostBinding("class.flex-base") appliedClass = true;
  @Input() data: any = [];
  @Input() chartPropertiesObject: any;
  @Input() chartHeight!: number;
  @Output() categoryLabelClick = new EventEmitter<string>();
  @Output() onSeriesClickEvent = new EventEmitter<any>();
  @Output() onCategoryAxisLableClickEvent = new EventEmitter<any>();
  @Input() highlightedColumn: { id: number; response: number } | null = null; // Specific column to highlight
  private root!: am5.Root;
  private chart!: am5xy.XYChart;
  @Output() nullDataCondition = new EventEmitter<string>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) { }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"] && !changes["data"].firstChange) {
      if (this.root) {
        this.root.dispose();
      }
      this.createChart();
    }

    if (
      changes["highlightedColumn"] &&
      changes["highlightedColumn"].currentValue
    ) {
      this.highlightColumn(changes["highlightedColumn"].currentValue);
    }
  }
  ngAfterViewInit() {
    this.createChart();
  }
  createChart(): void {
    this.browserOnly(() => {
      // Create root element
      this.root = am5.Root.new(this.chartPropertiesObject?.chartId);

      // Set themes
      this.root.setThemes([am5themes_Animated.new(this.root)]);

      // Create chart Container(Main Root)
      this.chart = this.root.container.children.push(
        am5xy.XYChart.new(this.root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: this.chartPropertiesObject.paddingBottom
        })
      );

      if (this.chartPropertiesObject.isEnableXscrollbars) {
        var scrollbarX = this.chart.set(
          "scrollbarX",
          am5.Scrollbar.new(this.root, {
            orientation: "horizontal",
            maxHeight: 4,
            // visible: this.chartPropertiesObject.isVisibleXhorizontalScrollbar,
          })
        );
        scrollbarX.startGrip.set("scale", 0.5);
        scrollbarX.endGrip.set("scale", 0.5);
      }

      if (this.chartPropertiesObject.isEnableYscrollbars) {
        var scrollbarY = this.chart.set(
          "scrollbarY",
          am5.Scrollbar.new(this.root, {
            orientation: "vertical",
            maxWidth: 4,
            // visible: this.chartPropertiesObject.isVisibleYverticalScrollbar,
          })
        );
        scrollbarY.startGrip.set("scale", 0.5);
        scrollbarY.endGrip.set("scale", 0.5);
      }

      // Add cursor
      var cursor = this.chart.set("cursor", am5xy.XYCursor.new(this.root, {}));
      cursor.lineY.set("visible", false);
      cursor.lineX.set("visible", false);

      // Grid line color set
      this.root.interfaceColors.set("grid", am5.color(0xffffff));

      // ------------------------------------------------( X-axis--CategoryAxis )-------------------------------->
      // Create X-axes
      var xRenderer = am5xy.AxisRendererX.new(this.root, {
        minGridDistance: this.chartPropertiesObject.minGridDistanceXaxis,
        // minorGridEnabled: true,
        strokeOpacity: this.chartPropertiesObject.gridLineOpacityXaxis,
      });

      // X-Axis ( Lables )   set
      xRenderer.labels.template.setAll({
        rotation: this.chartPropertiesObject.rotationX,
        centerY: am5.p50,
        centerX: am5.p50,
        // paddingRight: this.chartPropertiesObject.paddingRight,
        fill: am5.color(this.chartPropertiesObject.labelColorX),
        fontSize: this.chartPropertiesObject.fontSize,
        // paddingRight: 30,
        paddingTop: 7,
        visible: this.chartPropertiesObject.isVisibleXaxisLables,
        forceHidden: this.chartPropertiesObject?.ishiddenXaxisLables,
        cursorOverStyle: "pointer",
      });

      // X-Axis ( Grid-Location )   set
      xRenderer.grid.template.setAll({
        location: 1,
      });

      // X-Axis ----------Main--CategoryAxis -( X-axis )
      var xAxis = this.chart.xAxes.push(
        am5xy.CategoryAxis.new(this.root, {
          maxDeviation: 0.3,
          categoryField: this.chartPropertiesObject?.categoryField,
          renderer: xRenderer,
          // tooltip: am5.Tooltip.new(this.root, {})
        })
      );

      // X-Axis ( Grid )   set
      xAxis.get("renderer").grid.template.setAll({
        location: 0,
        strokeWidth: 0,
        visible: this.chartPropertiesObject.isVisibleXaxisGrid,
      });

      xAxis.get("renderer").labels.template.setup = (target) => {
        target.setAll({
          cursorOverStyle: this.chartPropertiesObject.pointerX, //"pointer",
          maxWidth: this.chartPropertiesObject.lableWrapMaxWidthX, // Maximum width of the label
          oversizedBehavior: this.chartPropertiesObject.lableWrapX, //"wrap", // Truncate text if it overflows
          textAlign: "center", // Align text
          background: am5.Rectangle.new(this.root, {
            fill: am5.color(0x000000),
            fillOpacity: 0,
          }),
        });
      };

      xAxis.get("renderer").labels.template.states.create("highlight", {
        fill: am5.color(0xc58af9),
        fontSize: "13px",
        // fontWeight: "600",
      });

      //For this code No heighlight (Pureple color)
      xAxis.get("renderer").labels.template.states.create("nohighlight", {
        fill: am5.color(0x00bfff),
        fontSize: "13px",
        // fontWeight: "600",
      });

      xAxis.events.on("datavalidated", () => {
        const label = xAxis
          .get("renderer")
          .labels.getIndex(this.chartPropertiesObject?.ActiveDataIndex);
        if (label) {
          label.states.apply("highlight");
        }
      });

      // xAxis.get("renderer").labels.template.events.on("click", (ev: any) => {
      //   // const category = ev.target.dataItem.get('categoryX');
      //   const category = ev.target.dataItem?.dataContext;

      //   this.onCategoryLabelClick(category);
      //   this.onCategoryAxisLableClickEvent.emit(
      //     ev.target.dataItem?.dataContext
      //   );
      // });

      if (this.chartPropertiesObject.isCategoryAxisClickEvent) {
        var selectedLabels: any;
        xAxis.get("renderer").labels.template.events.on("click", (ev) => {
          this.onCategoryAxisLableClickEvent.emit(
            ev.target.dataItem?.dataContext
          );
          var labels = ev.target;
          if (this.chartPropertiesObject?.ActiveDataIndex != undefined) {
            const label = xAxis
              .get("renderer")
              .labels.getIndex(this.chartPropertiesObject?.ActiveDataIndex);
            if (label) {
              label.states.apply("nohighlight");
            }
          }
          if (selectedLabels) {
            selectedLabels.states.apply("default");
            selectedLabels = undefined;
          }
          labels.states.apply("highlight");
          selectedLabels = labels;
        });
      }

      if (this.chartPropertiesObject.isCategoryAxisClickEventNohighlight) {
        var selectedLabels: any;
        xAxis.get("renderer").labels.template.events.on("click", (ev) => {
          this.onCategoryAxisLableClickEvent.emit(
            ev.target.dataItem?.dataContext
          );
          var labels = ev.target;

          if (selectedLabels) {
            selectedLabels.states.apply("default");
            selectedLabels = undefined;
          }

          labels.states.apply("nohighlight");
          selectedLabels = labels;
        });
      }

      // X-Axis ( Title )   set
      xAxis.children.push(
        am5.Label.new(this.root, {
          text: this.chartPropertiesObject.titleX,
          textAlign: "center",
          x: am5.p50,
          fontWeight: "bold",
          fill: am5.color(0xa0aec0),
          visible: this.chartPropertiesObject.isVisibleXaxisTitle,
        })
      );

      // ------------------------------------------------( Y-axis--ValueAxis )-------------------------------->
      // Y-Axis ( Stroke ) text  set
      var yRenderer = am5xy.AxisRendererY.new(this.root, {
        strokeOpacity: this.chartPropertiesObject.gridLineOpacityYaxis,
        // minorGridEnabled: true,
        minGridDistance: this.chartPropertiesObject.minGridDistanceYaxis,
      });

      // Y-Axis ----------Main--ValueAxis -( X-axis )
      var yAxis = this.chart.yAxes.push(
        am5xy.ValueAxis.new(this.root, {
          min: 0,
          extraMax: 0.1,
          // maxDeviation: 0.9,
          // maxDeviation: 0.3,
          renderer: yRenderer,
        })
      );

      // Y-Axis ( Lables )   set
      yRenderer.labels.template.setAll({
        rotation: this.chartPropertiesObject.rotationY,
        centerY: am5.p50,
        centerX: am5.p100,
        fill: am5.color(this.chartPropertiesObject.labelColorY),
        fontSize: this.chartPropertiesObject.fontSize,
        paddingRight: 9,
        // paddingTop: 7,
        visible: this.chartPropertiesObject.isVisibleYaxisLables,
        forceHidden: this.chartPropertiesObject?.ishiddenYaxisLables,
        cursorOverStyle: "pointer",
      });

      // Y-Axis ( Grid )   set
      yAxis.get("renderer").grid.template.setAll({
        location: 0,
        strokeWidth: 0,
        visible: this.chartPropertiesObject.isVisibleYaxisGrid,
      });

      // Y-Axis ( Grid location)   set
      yRenderer.grid.template.setAll({
        location: 1,
      });

      // Y-Axis ( Title)   set
      yAxis.children.unshift(
        am5.Label.new(this.root, {
          text: this.chartPropertiesObject.titleY,
          textAlign: "center",
          y: am5.p50,
          rotation: -90,
          fontWeight: "bold",
          fill: am5.color(0xa0aec0),
          visible: this.chartPropertiesObject.isVisibleYaxisTitle,
        })
      );

      // Create series
      var series = this.chart.series.push(
        am5xy.ColumnSeries.new(this.root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: this.chartPropertiesObject?.valueField, //"value",
          sequencedInterpolation: true,
          categoryXField: this.chartPropertiesObject?.categoryField, //"category",

          // tooltip: am5.Tooltip.new(this.root, {
          //   labelHTML: this.chartPropertiesObject.htmlTooltip,
          // })

          tooltip: this.chartPropertiesObject?.useHtmlTooltip
            ? am5.Tooltip.new(this.root, {
              labelHTML: this.chartPropertiesObject?.htmlTooltip,
            })
            : undefined,
        })
      );

      // series Column Corner Radius set
      series.columns.template.setAll({
        cornerRadiusTL: 1,
        cornerRadiusTR: 1,
        strokeOpacity: 0,
      });

      series.set(
        "fill",
        am5.color(this.chartPropertiesObject.singlecolorforColumn)
      );
      series.set(
        "stroke",
        am5.color(this.chartPropertiesObject.singlecolorforColumn)
      );

      series.columns.template.events.on("click", (ev) => {
        this.onSeriesClickEvent.emit(ev.target.dataItem?.dataContext); //Column Series Click Event
      });

      // series.columns.template.adapters.add("fill", (fill, target) => {
      //   const dataContext: any = target.dataItem?.dataContext;
      //   if (dataContext) {
      //     const index = dataContext.index!;
      //     return this.chartPropertiesObject?.multiplecolorArray[index % this.chartPropertiesObject?.multiplecolorArray.length];
      //   }
      //   return fill;
      // });

      if (this.chartPropertiesObject.isStaticColorForColumnSeries) {
        series.columns.template.adapters.add("fill", (fill, target) => {
          const dataContext: any = target.dataItem?.dataContext; // Access the data context
          if (dataContext) {
            const index = this.data.indexOf(dataContext); // Get the index of the data item
            return this.chartPropertiesObject?.multiplecolorArray[
              index % this.chartPropertiesObject?.multiplecolorArray.length
            ];
          }
          return fill; // Return default color if no data context
        });

        series.columns.template.adapters.add("stroke", (stroke, target) => {
          const dataContext: any = target.dataItem?.dataContext;
          if (dataContext) {
            const index = dataContext.index!;
            return this.chartPropertiesObject?.multiplecolorArray[
              index % this.chartPropertiesObject?.multiplecolorArray.length
            ];
          }
          return stroke;
        });
      }

      series.columns.template.setAll({
        // width: am5.percent(90),
        width: this.chartPropertiesObject?.columnWidthset,
      });

      // highlight columns on condition

      // Set default column colors
      // series.columns.template.set("fill", am5.color(0x67b7dc)); // Default color

      // series.columns.template.adapters.add("fill", (fill, target:any) => {
      //   let dataItem = target.dataItem.dataContext;

      //   if (this.isHeighlightSelected != '') {

      //     if (dataItem && dataItem[this.chartPropertiesObject?.isActiveHeightLight] === this.isHeighlightSelected) {
      //       return am5.color(0xffa500); // Orange
      //     }
      //     return fill;
      //   }
      //   else {
      //     return fill;
      //   }
      // });

      // highlight columns on condition

      // Create line series
      var lineSeries = this.chart.series.push(
        am5xy.LineSeries.new(this.root, {
          name: "Line",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: this.chartPropertiesObject?.valueField,
          categoryXField: this.chartPropertiesObject?.categoryField,
          // stroke: am5.color(0xff0000),
          // fill: am5.color(0xff0000),
          //strokeOpacity: ,
          //strokeWidth: 0,
          visible: true,
        })
      );

      lineSeries.strokes.template.setAll({
        strokeWidth: 0,
        strokeOpacity: 0,
        strokeDasharray: [0, 0],
      });
      // Define types for series and dataItem

      // Add the bullet function
      lineSeries.bullets.push(
        (
          root: am5.Root,
          series: any,
          dataItem: any
        ): am5.Bullet | undefined => {
          if (
            dataItem.dataContext[this.chartPropertiesObject?.LineBulletField]
          ) {
            const container = am5.Container.new(root, {});

            const circleProps = {
              radius: 5,
              fill: am5.color(0xf59e0b),
            };

            const circle0 = container.children.push(
              am5.Circle.new(root, circleProps)
            );
            const circle1 = container.children.push(
              am5.Circle.new(root, circleProps)
            );

            // Animate circle1
            circle1.animate({
              key: "radius",
              to: 20,
              duration: 1000,
              easing: am5.ease.out(am5.ease.cubic),
              loops: Infinity,
            });
            circle1.animate({
              key: "opacity",
              to: 0,
              from: 1,
              duration: 1000,
              easing: am5.ease.out(am5.ease.cubic),
              loops: Infinity,
            });

            // Return the bullet with the container
            return am5.Bullet.new(root, {
              sprite: container,
            });
          }
          return undefined; // Explicitly return undefined if no bullet is created
        }
      );

      // Set data for line series
      lineSeries.data.setAll(this.data);
      // Make the chart animate on load

      lineSeries.appear(1000);

      // lableBullet Set in column Top
      if (this.chartPropertiesObject.disableTopLabelBullets) {
        series.bullets.push(() => {
          return am5.Bullet.new(this.root, {
            locationX: 0.5,
            locationY: 1,
            sprite: am5.Label.new(this.root, {
              text:
                "{valueY}" +
                this.chartPropertiesObject?.specialCharacterForBullet,
              fill: am5.color(0xffffff),
              centerX: am5.percent(50),
              centerY: am5.percent(80),
              populateText: true,
            }),
          });
        });
      }

      // lableBullet Set in  column Center
      if (this.chartPropertiesObject.disableCenterLabelBullets) {
        series.bullets.push(() => {
          return am5.Bullet.new(this.root, {
            locationY: 0.5,
            sprite: am5.Label.new(this.root, {
              text: "{valueY}",
              fill: this.root.interfaceColors.get("alternativeText"),
              centerY: am5.percent(50),
              centerX: am5.percent(50),
              populateText: true,
              rotation: this.chartPropertiesObject.centerBulletlableRotation,
              fontSize: this.chartPropertiesObject.isLableBulletFontSize,
            }),
          });
        });
      }

      // Create legend

      var legend = this.chart.children.push(
        am5.Legend.new(this.root, {
          forceHidden: this.chartPropertiesObject?.legendHide,
          // centerY: am5.percent(50),
          // y: am5.percent(50),
          centerX: am5.percent(50),
          x: am5.percent(50),
          marginTop: 15,
          marginBottom: 15,
          // layout: this.root.verticalLayout,
        })
      );

      //Legend Box width and height set
      legend.markers.template.setAll({
        width: 10,
        height: 10,
      });

      //Legend label text font size and font weight
      legend.labels.template.setAll({
        fontSize: 14,
        fontWeight: "500",
        fill: am5.color(0xa0aec0),
        visible: this.chartPropertiesObject?.legendLableVisible,
      });
      //Legend labelValue (number) font size and font weight
      legend.valueLabels.template.setAll({
        fontSize: 15,
        fontWeight: "700",
        fill: am5.color(0xa0aec0),
        visible: this.chartPropertiesObject?.legendValueVisible,
      });

      legend.data.setAll(series.dataItems);

      //#region ---- chart-Loader----
      // New loader Indicator-----------------------------------------------------------------------------------Simple-Column-chart
      const indicator = this.root.container.children.push(
        am5.Container.new(this.root, {
          width: am5.p100,
          height: am5.p100,
          layer: 1000,
          // background: am5.Rectangle.new(this.root, {
          //   fill: am5.color(0x2e2e2e),
          //   fillOpacity: 0.1,
          // }),
        })
      );

      // Store reference to loading labels
      const loadingLabel = am5.Label.new(this.root, {
        text: "Loading...",
        fontSize: 18,
        fill: am5.color(0x74828d),
        fontWeight: "bold",
        x: am5.p50,
        y: am5.p50,
        dy: 5,
        centerX: am5.p50,
        centerY: am5.p50,
      });

      indicator.children.push(loadingLabel);

      var hourglass = indicator.children.push(
        am5.Graphics.new(this.root, {
          width: 99,
          height: 99,
          fill: am5.color(0x74828d),
          x: am5.p50,
          y: am5.p50,
          centerX: am5.p50,
          centerY: am5.p50,
          dy: -30,
          svgPath: "M32 16a1 1 0 0 1-1-1v-5a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1zm12 5a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l3.54-3.53a1 1 0 0 1 1.41 1.41l-3.53 3.54A1 1 0 0 1 44 21zm10 12h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2zm-6.44 15.56a1 1 0 0 1-.71-.3l-3.54-3.53a1 1 0 1 1 1.42-1.42l3.53 3.54a1 1 0 0 1 0 1.41 1 1 0 0 1-.7.3zM32 55a1 1 0 0 1-1-1v-5a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1zm-15.56-6.44a1 1 0 0 1-.7-.3 1 1 0 0 1 0-1.41l3.53-3.54a1 1 0 1 1 1.42 1.42l-3.54 3.53a1 1 0 0 1-.71.3zM15 33h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2zm5-12a1 1 0 0 1-.71-.29l-3.53-3.54a1 1 0 0 1 1.41-1.41l3.54 3.53a1 1 0 0 1 0 1.42A1 1 0 0 1 20 21z",
          // "M46 25.7c-2.2 0-4-1.8-4-4V4.5c0-2.2 1.8-4 4-4s4 1.8 4 4v17.2c0 2.2-1.8 4-4 4zm-11.9 3.9c1.8-1.3 2.2-3.8.9-5.6L24.8 10.1c-1.3-1.8-3.8-2.2-5.6-.9-1.8 1.3-2.2 3.8-.9 5.6l10.1 13.9c.8 1.1 2 1.6 3.2 1.6.9.1 1.8-.2 2.5-.7zm-7.4 10.1c.7-2.1-.5-4.4-2.6-5L7.7 29.4c-2.1-.7-4.4.5-5 2.6-.7 2 .5 4.3 2.6 5l16.4 5.3c.4.1.8.2 1.2.2 1.7 0 3.2-1.1 3.8-2.8zm-19 22.9l16.4-5.3c2.1-.7 3.3-2.9 2.6-5-.7-2.1-2.9-3.2-5-2.6L5.3 55c-2.1.7-3.3 2.9-2.6 5 .5 1.7 2.1 2.8 3.8 2.8.4 0 .8 0 1.2-.2zm17.1 19.3L35 68c1.3-1.8.9-4.3-.9-5.6s-4.3-.9-5.6.9L18.4 77.2c-1.3 1.8-.9 4.3.9 5.6.7.5 1.5.8 2.3.8 1.2 0 2.4-.6 3.2-1.7zM50 87.5V70.3c0-2.2-1.8-4-4-4s-4 1.8-4 4v17.2c0 2.2 1.8 4 4 4s4-1.8 4-4zm22.8-4.7c1.8-1.3 2.2-3.8.9-5.6L63.5 63.3c-1.3-1.8-3.8-2.2-5.6-.9-1.8 1.3-2.2 3.8-.9 5.6l10.1 13.9c.8 1.1 2 1.6 3.2 1.6.9.1 1.8-.2 2.5-.7zm16.5-22.7c.7-2.1-.5-4.4-2.6-5l-16.4-5.3c-2.1-.7-4.4.5-5 2.6-.7 2.1.5 4.4 2.6 5l16.4 5.3c.4.1.8.2 1.2.2 1.7-.1 3.3-1.2 3.8-2.8zm-19-17.8L86.7 37c2.1-.7 3.3-2.9 2.6-5-.7-2.1-2.9-3.2-5-2.6l-16.4 5.3c-2.1.7-3.3 2.9-2.6 5 .5 1.7 2.1 2.8 3.8 2.8.4 0 .8-.1 1.2-.2zm-6.8-13.6l10.1-13.9c1.3-1.8.9-4.3-.9-5.6-1.8-1.3-4.3-.9-5.6.9L57 24c-1.3 1.8-.9 4.3.9 5.6.7.5 1.5.8 2.3.8 1.3 0 2.5-.6 3.3-1.7z",
          scale: 0.8,
        })
      );

      const hourglassAnimation = hourglass.animate({
        key: "rotation",
        to: 180,
        loops: Infinity,
        duration: 2000,
        easing: am5.ease.inOut(am5.ease.cubic),
      });

      const toggleIndicator = (show: boolean) => {
        if (show) {
          hourglassAnimation.play();
          indicator.show();
          xAxis.hide();
          yAxis.hide();
        } else {
          hourglassAnimation.pause();
          indicator.hide();
          xAxis.show();
          yAxis.show();
        }
      };

      toggleIndicator(true);

      let dataLoaded = false;

      const showNoDataMessage = () => {
        loadingLabel.hide();

        indicator.children.push(
          am5.Label.new(this.root, {
            text: "No Data Available",
            fontSize: 18,
            dy: 5,
            x: am5.p50,
            y: am5.p50,
            centerX: am5.p50,
            centerY: am5.p50,
            fill: am5.color(0xa4bed4),
          })
        );
      };

      const checkDataTimeout = setTimeout(() => {
        if (!dataLoaded) {
          showNoDataMessage();
          hourglass.hide();
        }
      }, 6000);

      // Simulate fetching data
      setTimeout(() => {
        if (this.data && this.data.length > 0) {
          dataLoaded = true;
          clearTimeout(checkDataTimeout);
          toggleIndicator(false);

          // xAxis.data.setAll(this.data);
          series.data.setAll(this.data);
        }
      });

      xAxis.data.setAll(this.data);
      // Make stuff animate on load
      series.appear(1000);
      this.chart.appear(1000, 100);
    });
  }

  private onCategoryLabelClick(category: any): void {
    this.categoryLabelClick.emit(category);
  }

  highlightColumn(column: { id: string; response: number }): void {
    this.data.forEach((item: any) => {
      // Highlight only if isElementChampionAnswer is 1 and value matches the clicked value
      item.highlight = item.name === column.response;
    });

    // Update chart series data to reflect changes
    this.chart.series.each((series) => {
      if (series instanceof am5xy.ColumnSeries) {
        series.data.setAll(this.data);
      }
    });

    // Step 3: Use an adapter to change the fill color based on 'highlight' flag
    this.chart.series.each((series) => {
      if (series instanceof am5xy.ColumnSeries) {
        series.columns.template.adapters.add("fill", (fill, target) => {
          const dataItem = target.dataItem;
          const context = dataItem?.dataContext as { highlight?: boolean }; // Check for the 'highlight' flag

          // If the item is highlighted, use red, else use blue
          if (context?.highlight) {
            return am5.color(0xf87171); // Highlight color (red)
          }

          return am5.color(0x67b7dc); // Default color (blue)
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.root) {
      this.root.dispose();
    }
  }
}

