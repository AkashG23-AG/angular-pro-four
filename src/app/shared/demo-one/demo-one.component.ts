import { Component, HostBinding } from '@angular/core';
import { ChartDataService } from '../amcharts5-demo/chart-data.service';
import * as am5 from "@amcharts/amcharts5";

@Component({
  selector: 'app-demo-one',
  templateUrl: './demo-one.component.html',
  styleUrls: ['./demo-one.component.scss']
})
export class DemoOneComponent {
   @HostBinding("class.flex-base") appliedClass = true;
  expandStatus: { [key: string]: boolean } = { window1: false };

  // Toggle function to change the value of expandStatus['window1']
  windows(window: string) {
    this.expandStatus[window] = !this.expandStatus[window];

  }
  items = [1, 2, 3, 4, 5, 6]; // This can be any data you want to loop over

   simplecolumnChartData: any[] = [];
  
    constructor(private chartDataService: ChartDataService) { }
  
    ngOnInit(): void {
      this.simplecolumnChartData = this.chartDataService.getChartData();
    }

     columnChartPropertiesObj = {
        // Chart Id
        chartId: "typesimpleChartDivID",
        // Data Field
        categoryField: "category",
        valueField: "value",
    
        labelColorX: "#d4d4d4",
        labelColorY: "#d4d4d4", //Blue for click event #00BFFF
    
        fontSize: "13px",
        paddingRight: "0px",
    
        rotationX: 0,
        rotationY: 0,
    
        minGridDistanceXaxis: 0,
        minGridDistanceYaxis: 30,
    
        columnWidthset: 70,
    
        titleX: "X-Axis title",
        titleY: "Y-Axis title",
    
        isStaticColorForColumnSeries: true,
        singlecolorforColumn: "#00BFFF",
    
        multiplecolorArray: [
          am5.color(0x34d399), // PM 
          am5.color(0x0ea5e9), // CM 
          am5.color(0x737373), // RM 
        ],
    
        isVisibleXaxisLables: true,
        isVisibleYaxisLables: true,
    
        isVisibleXaxisGrid: true,
        isVisibleYaxisGrid: true,
    
        gridLineOpacityXaxis: 0,
        gridLineOpacityYaxis: 0,
    
        useHtmlTooltip: true,
    
        //chart ( HTML Toltip )
        htmlTooltip: `<center><strong>{category} WO Count</strong></center>
                      <hr/>
                      <table>
                      <tr>
                        <td>WO Count</td>
                        <th align="left">: {value}</th>
                      </tr>
                      <tr>
                        <td>% of Count</td>
                        <th align="left">: {percentage}%</th>
                      </tr>
                         <tr>
                        <td>Monthly Change</td>
                        <th align="left">: {monthlyChange}%</th>
                      </tr>
                      </table>
                      <tr>`,
      };
}

