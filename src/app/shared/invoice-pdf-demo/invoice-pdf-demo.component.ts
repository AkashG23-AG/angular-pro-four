import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-pdf-demo',
  templateUrl: './invoice-pdf-demo.component.html',
  styleUrls: ['./invoice-pdf-demo.component.scss']
})
export class InvoicePdfDemoComponent {



printTable(): void {
  const tableElement = document.getElementById('print-section');
  if (!tableElement) return;

  const printContents = tableElement.innerHTML;
  const popupWin = window.open('Akash', 'Akash', '');
  popupWin!.document.open();
  popupWin!.document.write(`
    <html>
      <head>
        <title>Print PDF</title>
        <style>
          ${this.getPrintStyles()}
        </style>
      </head>
      <body onload="window.print();window.close()">
        ${printContents}
      </body>
    </html>
  `);
  popupWin!.document.close();
}

// example.component.ts
data = Array.from({ length: 80 }, (_, i) => ({
  name: `Person ${i + 1}`,
  age: 20 + (i % 30),
  city: ['Mumbai', 'Pune', 'Delhi', 'Chennai'][i % 4]
}));



getPrintStyles(): string {
  return `
    .print-container {
      margin: 20mm;
      padding: 10mm;
      border: 2px solid #333;
    }

    @page {
  size: A3 portrait;
  margin: 2mm;
}

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      border: 1px solid #aaa;
      padding: 8px;
      text-align: left;
    }

    thead {
      background-color: #f2f2f2;
    }

    @media print {
      body {
        margin: 0;
      }

      .print-container {
        margin: 20mm;
        padding: 10mm;
        border: 2px solid #333;
        page-break-inside: avoid;
      }

      table, tr, td, th {
        page-break-inside: avoid;
      }

      tr {
        page-break-after: auto;
      }

      thead {
        display: table-header-group;
      }

      tfoot {
        display: table-footer-group;
      }
    }
  `;
}



}
