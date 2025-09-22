import { Component } from '@angular/core';

@Component({
  selector: 'app-color-chart',
  templateUrl: './color-chart.component.html',
  styleUrls: ['./color-chart.component.scss']
})
export class ColorChartComponent {
  colors = {
    first: '',
    second: '',
    third: '',
    fourth: ''
  };
  i: any;

  resetColor(key: keyof typeof this.colors) {
    this.colors[key] = '';
  }

  resetAll() {
    this.colors = { first: '', second: '', third: '', fourth: '' };
  }

  colorsTwo: string[] = ['#f44336', '#2196f3', '#4caf50', '#ff9800'];

  // hexColors: string[] = ['', '', '', '']; // Four color inputs

  // public hexColors:string[]=[''];

  // hexColors: string[] = ['#f44336', '#2196f3', '#4caf50', '#ff9800'];

  hexColors = {
    first: '',
    second: '',
    third: '',
    fourth: ''
  };

}
