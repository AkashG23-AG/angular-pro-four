// src/app/services/chart-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  getChartData() {
    return [
      { category: 'Research', value: 1000 },
      { category: 'Marketing', value: 1200 },
      { category: 'Sales', value: 850 }
    ];
  }
}
