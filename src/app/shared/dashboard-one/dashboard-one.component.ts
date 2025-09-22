import { Component, ElementRef, ViewChild } from "@angular/core";
import PptxGenJS from "pptxgenjs";

@Component({
  selector: 'app-dashboard-one',
  standalone: false,
  templateUrl: './dashboard-one.component.html',
  styleUrls: ['./dashboard-one.component.scss']
})
export class DashboardOneComponent {
  @ViewChild("tableDiv") tableDiv!: ElementRef;

  exportToPPT() {
    let pptx = new PptxGenJS();
    
    // Extract table data
    let tableData: any[] = [];
    let rows = this.tableDiv.nativeElement.querySelectorAll("tr");

    rows.forEach((row: any, index: number) => {
      let rowData: any[] = [];
      row.querySelectorAll("th, td").forEach((cell: any) => {
        let cellStyle = {
          text: cell.innerText,
          options: {
            bold: index === 0, // Bold headers
            color: index === 0 ? "FFFFFF" : "000000", // Header text color white
            fill: index === 0 ? "007BFF" : "F1F1F1", // Header background blue
            align: "center",
          },
        };
        rowData.push(cellStyle);
      });
      tableData.push(rowData);
    });

    // Define chunk size (Max rows per slide)
    const chunkSize = 10; // Set this based on slide size
    let headers = tableData[0]; // Keep headers for all slides
    let dataChunks = [];

    // Split table data into chunks
    for (let i = 1; i < tableData.length; i += chunkSize) {
      dataChunks.push([headers, ...tableData.slice(i, i + chunkSize)]);
    }

    // Create slides for each chunk
    dataChunks.forEach((chunk, index) => {
      let slide = pptx.addSlide();
      slide.addText(`Table Data (Page ${index + 1})`, {
        x: 0.5,
        y: 0.2,
        fontSize: 20,
        bold: true,
      });
      slide.addTable(chunk, {
        x: 0.5,
        y: 0.8,
        w: 8.5,
        fontSize: 14,
        border: { type: "solid", color: "000000", pt: 1 },
      });
    });

    // Save the PPT file
    pptx.writeFile({ fileName: "Table_Split_Export.pptx" });
  }

  public gridData = [
    { ProductID: 1, ProductName: "Chai" },
    { ProductID: 2, ProductName: "Chang" }
  ];
  expandStatus: { [key: string]: boolean } = { window1: false };

  windows(window: string) {
    this.expandStatus[window] = !this.expandStatus[window];
  }


  currentIndex = 0;
  totalSections = 4;

  scrollTo(direction: 'prev' | 'next') {
    if (direction === 'next' && this.currentIndex < this.totalSections - 1) {
      this.currentIndex++;
    } else if (direction === 'prev' && this.currentIndex > 0) {
      this.currentIndex--;
    }

    const targetId = 'section' + this.currentIndex;
    const targetEl = document.getElementById(targetId);
    targetEl?.scrollIntoView({ behavior: 'smooth' });
  }
}
