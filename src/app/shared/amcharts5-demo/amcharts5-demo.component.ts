import { Component, HostBinding } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import { ChartDataService } from './chart-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amcharts5-demo',
  templateUrl: './amcharts5-demo.component.html',
  styleUrls: ['./amcharts5-demo.component.scss']
})
export class Amcharts5DemoComponent {
  @HostBinding("class.flex-base") appliedClass = true;
  activeDiv: string = 'div2';
  i: any;

  showDiv(divId: string) {
    this.activeDiv = divId;
  }

  simplecolumnChartData: any[] = [];

  constructor(private chartDataService: ChartDataService,private router: Router) { }

  PDFInvoice(){
    this.router.navigate(["/invoicepdfdemo"]);
  }

  ngOnInit(): void {
    this.simplecolumnChartData = this.chartDataService.getChartData();
     this.colorsHeight = window.innerHeight - 130;
  }

    public colorsHeight!: number
 

  expandStatus: { [key: string]: boolean } = { window1: false };

  public isExpandWindows1:boolean=false;
  public isExpandWindows2:boolean=false;
  public isExpandWindows3:boolean=false;
  public isExpandWindows4:boolean=false;
  windows(status: string) {
    if(status == '1'){
      this.isExpandWindows1 = !this.isExpandWindows1;
    } else if(status == '2'){
      this.isExpandWindows2 = !this.isExpandWindows2;
    }else if(status == '3'){
      this.isExpandWindows3 = !this.isExpandWindows3;
    }else if(status == '4'){
      this.isExpandWindows4 = !this.isExpandWindows4;
    }
  }

  columnChartPropertiesObj = {
    // Chart Id
    chartId: "typeChartDiv",
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

  barChartPropertiesObj = {
    // Chart Id
    chartId: "hrsChartDiv",

    // Data Field
    categoryField: "category",
    valueField: "value",

    //Both X and Y axis ( lable )
    labelColorX: "#d4d4d4",
    labelColorY: "#d4d4d4", // blue color-code (#00BFFF) - for click event

    //Both X and Y axis ( Fontsize )
    fontSize: "13px",

    //Both X and Y axis ( lable rotation )
    rotationX: 0,
    rotationY: 0,

    //Both X and Y axis ( min grid distance )
    minGridDistanceXaxis: 40,
    minGridDistanceYaxis: 0,

    //Both X and Y axis ( grid opacity line Enable or Disable )
    gridLineOpacityXaxis: 0,
    gridLineOpacityYaxis: 0.1,

    //Both X and Y axis ( Title text )
    titleX: "X-Axis title",
    titleY: "Y-Axis title",

    //Series Columns ( Colors )
    isStaticColorForColumnSeries: true,
    //Series Columns ( Colors )
    singlecolorforColumn: "#00BFFF",

    multiplecolorArray: [

      am5.color(0x34d399), // light Blue  PM
      am5.color(0x0ea5e9), //light Pista  CM
      am5.color(0x737373), //light red  RM
    ],

    isSeriesMultipleColor: false,

    //Both X and Y axis ( grid Enable or Disable )
    isVisibleXaxisGrid: false,
    isVisibleYaxisGrid: false,

    //Both X and Y axis (Lables  Enable or Disable )
    isVisibleXaxisLables: false,
    isVisibleYaxisLables: true,

    //Both X and Y axis ( Title Enable or Disable )
    isVisibleXaxisTitle: false,
    isVisibleYaxisTitle: false,

    //Both X and Y axis ( lable Bullet Enable or Disable )
    isdisableOutsideLabelBullets: false,
    isdisableInsideLabelBullets: true,
    isLableBulletFontSize: 13, // lable bullet fontsize

    //To display %,$,Min. etc
    specialCharacterForBullet: "",

    //Both X and Y axis ( Chart scrollbar Enable or Disable )
    isEnableYscrollbars: false,
    isEnableXscrollbars: false,

    useHtmlTooltip: true,
    //chart ( HTML Toltip )
    htmlTooltip: `<center><strong>{category} Labor Hrs</strong></center>
                  <hr/>
                  <table>
                  <tr>
                    <td>WO Hrs</td>
                    <th align="left">: {value}</th>
                  </tr>
                  <tr>
                    <td>% of Hrs</td>
                    <th align="left">: {percentage}%</th>
                  </tr>
                     <tr>
                    <td>Monthly Change</td>
                    <th align="left">: {monthlyChange}%</th>
                  </tr>
                  </table>
                  <tr>`,
  };


  isOpen = false;

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

  closeDrawer() {
    this.isOpen = false;
  }

    activeAccordion: number | null = null;

  toggleAccordion(id: number) {
    this.activeAccordion = this.activeAccordion === id ? null : id;
  }


  // colors = [
  //   { hex: '#F87171' },{ hex: '#60A5FA' }, { hex: '#34D399' }, { hex: '#FBBF24' }, { hex: '#8E79F7' }, { hex: '#BBBBBB' }, { hex: '#A9CC3B' }, { hex: '#1593E6' }, { hex: '#DDDDDD' }, { hex: '#F3F4F6' },
    
  // ];

colors: string[] = [
    "#F87171","#EF4444","#DC2626","#B91C1C","#991B1B", // reds
    "#FBBF24","#F59E0B","#D97706","#B45309","#92400E", // ambers
    "#FACC15","#EAB308","#CA8A04","#A16207","#854D0E", // yellows
    "#34D399","#10B981","#059669","#047857","#065F46", // greens
    "#60A5FA","#3B82F6","#2563EB","#1D4ED8","#1E40AF", // blues
    "#A78BFA","#8B5CF6","#7C3AED","#6D28D9","#5B21B6", // indigos/violets
    "#F472B6","#EC4899","#DB2777","#BE185D","#9D174D", // pinks
    "#C084FC","#A855F7","#9333EA","#7E22CE","#6B21A8", // purples
    "#38BDF8","#0EA5E9","#0284C7","#0369A1","#075985", // sky
    "#22D3EE","#06B6D4","#0891B2","#0E7490","#155E75", // cyan
    "#2DD4BF","#14B8A6","#0D9488","#0F766E","#115E59", // teal
    "#FDE68A","#FCD34D","#FBBF24","#F59E0B","#D97706", // gold shades
    "#9CA3AF","#6B7280","#4B5563","#374151","#1F2937", // grays
    "#FFFFFF","#F9FAFB","#F3F4F6","#E5E7EB","#D1D5DB", // light grays/white
    "#000000","#111827","#1E293B","#0F172A","#020617", // dark grays/black
    // Fill up to 100
    "#FFE4E6","#FCC2D7","#FAA2C1","#F783AC","#F06595",
    "#D6336C","#C2255C","#A61E4D","#862E9C","#5F3DC4",
    "#4263EB","#364FC7","#2C3EBD","#2432A8","#1D267D",
    "#1864AB","#0B7285","#087F5B","#099268","#66A80F",
    "#82C91E","#A9E34B","#C0EB75","#D8F5A2","#E9FAC8",
    "#FFD43B","#FAB005","#F08C00","#E8590C","#D9480F",
    "#C92A2A","#A61E4D","#862E9C","#6741D9","#5F3DC4",
    "#4263EB","#1C7ED6","#1971C2","#1864AB","#0B7285",
    "#099268","#2F9E44","#37B24D","#40C057","#51CF66",
     "#F87171", "#EF4444", "#DC2626", "#B91C1C", "#991B1B",
  "#FCA5A5", "#F87171", "#EF4444", "#DC2626", "#B91C1C",
  "#FCD34D", "#FBBF24", "#F59E0B", "#D97706", "#B45309",
  "#A3E635", "#84CC16", "#65A30D", "#4D7C0F", "#3F6212",
  "#6EE7B7", "#34D399", "#10B981", "#059669", "#047857",
  "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8",
  "#C4B5FD", "#A78BFA", "#8B5CF6", "#7C3AED", "#6D28D9",
  "#F9A8D4", "#F472B6", "#EC4899", "#DB2777", "#BE185D",
  "#F3F4F6", "#E5E7EB", "#D1D5DB", "#9CA3AF", "#6B7280",
  "#374151", "#1F2937", "#111827", "#000000", "#FFFFFF",
  "#FFEDD5", "#FED7AA", "#FDBA74", "#FB923C", "#F97316",
  "#EA580C", "#C2410C", "#9A3412", "#7C2D12", "#5A1F0F",
  "#FEF3C7", "#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B",
  "#D97706", "#B45309", "#92400E", "#78350F", "#451A03",
  "#ECFCCB", "#D9F99D", "#BEF264", "#A3E635", "#84CC16",
  "#65A30D", "#4D7C0F", "#3F6212", "#365314", "#1A2E05",
  "#CCFBF1", "#99F6E4", "#5EEAD4", "#2DD4BF", "#14B8A6",
  "#0D9488", "#0F766E", "#115E59", "#134E4A", "#164E63",
  "#E0F2FE", "#BAE6FD", "#7DD3FC", "#38BDF8", "#0EA5E9",
  "#0284C7", "#0369A1", "#075985", "#0C4A6E", "#1E3A8A",
  "#E0E7FF", "#C7D2FE", "#A5B4FC", "#818CF8", "#6366F1",
  "#4F46E5", "#4338CA", "#3730A3", "#312E81", "#1E1B4B",
  "#FAE8FF", "#F5D0FE", "#F0ABFC", "#E879F9", "#D946EF",
  "#C026D3", "#A21CAF", "#86198F", "#701A75", "#4A044E",
  "#F3F4F6", "#E5E7EB", "#D1D5DB", "#9CA3AF", "#6B7280",
  "#4B5563", "#374151", "#1F2937", "#111827", "#000000",
  "#FFF1F2", "#FFE4E6", "#FECDD3", "#FDA4AF", "#FB7185",
  "#F43F5E", "#E11D48", "#BE123C", "#9F1239", "#881337",
  "#FDF2F8", "#FCE7F3", "#FBCFE8", "#F9A8D4", "#F472B6",
  "#EC4899", "#DB2777", "#BE185D", "#9D174D", "#831843",
  "#F0FDF4", "#DCFCE7", "#BBF7D0", "#86EFAC", "#4ADE80",
  "#22C55E", "#16A34A", "#15803D", "#166534", "#14532D",
  "#F0F9FF", "#E0F2FE", "#BAE6FD", "#7DD3FC", "#38BDF8",
  "#0EA5E9", "#0284C7", "#0369A1", "#075985", "#0C4A6E",
  "#EFF6FF", "#DBEAFE", "#BFDBFE", "#93C5FD", "#60A5FA",
  "#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A",
  "#EEF2FF", "#E0E7FF", "#C7D2FE", "#A5B4FC", "#818CF8",
  "#6366F1", "#4F46E5", "#4338CA", "#3730A3", "#312E81",
  "#FDF4FF", "#FAE8FF", "#F5D0FE", "#F0ABFC", "#E879F9",
  "#D946EF", "#C026D3", "#A21CAF", "#86198F", "#701A75",
  "#F5F5F5", "#E5E5E5", "#D4D4D4", "#A3A3A3", "#737373",
  "#525252", "#404040", "#262626", "#171717", "#0A0A0A",
  "#F87171", "#EF4444", "#DC2626", "#B91C1C", "#991B1B",
  "#FCA5A5", "#FCD34D", "#FBBF24", "#F59E0B", "#D97706",
  "#A3E635", "#84CC16", "#65A30D", "#4D7C0F", "#3F6212",
  "#6EE7B7", "#34D399", "#10B981", "#059669", "#047857",
  "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8",
  "#C4B5FD", "#A78BFA", "#8B5CF6", "#7C3AED", "#6D28D9",
  "#F9A8D4", "#F472B6", "#EC4899", "#DB2777", "#BE185D",
  "#F3F4F6", "#E5E7EB", "#D1D5DB", "#9CA3AF", "#6B7280",
  "#374151", "#1F2937", "#111827", "#000000", "#FFFFFF",
  "#FFEDD5", "#FED7AA", "#FDBA74", "#FB923C", "#F97316",
  "#EA580C", "#C2410C", "#9A3412", "#7C2D12", "#5A1F0F",
  "#FEF3C7", "#FDE68A", "#FCD34D", "#FBBF24", "#F59E0B",
  "#D97706", "#B45309", "#92400E", "#78350F", "#451A03",
  "#ECFCCB", "#D9F99D", "#BEF264", "#A3E635", "#84CC16",
  "#65A30D", "#4D7C0F", "#3F6212", "#365314", "#1A2E05",
  "#CCFBF1", "#99F6E4", "#5EEAD4", "#2DD4BF", "#14B8A6",
  "#0D9488", "#0F766E", "#115E59", "#134E4A", "#164E63",
  "#E0F2FE", "#BAE6FD", "#7DD3FC", "#38BDF8", "#0EA5E9",
  "#0284C7", "#0369A1", "#075985", "#0C4A6E", "#1E3A8A",
  "#E0E7FF", "#C7D2FE", "#A5B4FC", "#818CF8", "#6366F1",
  "#4F46E5", "#4338CA", "#3730A3", "#312E81", "#1E1B4B",
  "#FAE8FF", "#F5D0FE", "#F0ABFC", "#E879F9", "#D946EF",
  "#C026D3", "#A21CAF", "#86198F", "#701A75", "#4A044E",
  "#FFF1F2", "#FFE4E6", "#FECDD3", "#FDA4AF", "#FB7185",
  "#F43F5E", "#E11D48", "#BE123C", "#9F1239", "#881337",
  "#FDF2F8", "#FCE7F3", "#FBCFE8", "#F9A8D4", "#F472B6",
  "#EC4899", "#DB2777", "#BE185D", "#9D174D", "#831843",
  "#F0FDF4", "#DCFCE7", "#BBF7D0", "#86EFAC", "#4ADE80",
  "#22C55E", "#16A34A", "#15803D", "#166534", "#14532D",
  "#F0F9FF", "#E0F2FE", "#BAE6FD", "#7DD3FC", "#38BDF8",
  "#0EA5E9", "#0284C7", "#0369A1", "#075985", "#0C4A6E",
  "#EFF6FF", "#DBEAFE", "#BFDBFE", "#93C5FD", "#60A5FA",
  "#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF", "#1E3A8A",
  "#EEF2FF", "#E0E7FF", "#C7D2FE", "#A5B4FC", "#818CF8",
  "#6366F1", "#4F46E5", "#4338CA", "#3730A3", "#312E81",
  "#FDF4FF", "#FAE8FF", "#F5D0FE", "#F0ABFC", "#E879F9",
  "#D946EF", "#C026D3", "#A21CAF", "#86198F", "#701A75",
  "#F5F5F5", "#E5E5E5", "#D4D4D4", "#A3A3A3", "#737373",
  "#525252", "#404040", "#262626", "#171717", "#0A0A0A",
  "#FFB6C1", "#FF69B4", "#FF1493", "#DB7093", "#C71585",
  "#E9967A", "#FA8072", "#F08080", "#CD5C5C", "#DC143C",
  "#B22222", "#8B0000", "#800000", "#A52A2A", "#DEB887",
  "#D2B48C", "#F4A460", "#DAA520", "#FFD700", "#B8860B",
  "#8B4513", "#A0522D", "#CD853F", "#D2691E", "#FF7F50",
  "#FF6347", "#FF4500", "#FF8C00", "#FFA500", "#FFA07A",
  "#20B2AA", "#40E0D0", "#48D1CC", "#00CED1", "#5F9EA0",
  "#4682B4", "#6495ED", "#00BFFF", "#1E90FF", "#4169E1",
  "#6A5ACD", "#7B68EE", "#9370DB", "#8A2BE2", "#9400D3"
  ];  

  copiedColor: string | null = null;

  copyColor(hex: string) {
    navigator.clipboard.writeText(hex).then(() => {
      this.copiedColor = hex;
      // setTimeout(() => {
      //   this.copiedColor = null;
      // }, 1500);
    });
  }

  public hexColors:string[]=[''];

  colours: string[] = ['', '', '', '']; // Four color inputs

  resetColor(index: number) {
    this.colours[index] = '';
  }

  chartData = [
  { category: "A", value: 40 },
  { category: "B", value: 55 },
  { category: "C", value: 70 }
];

pieData = [
  { category: "Apples", value: 10 },
  { category: "Bananas", value: 20 },
  { category: "Oranges", value: 30 }
];

}
