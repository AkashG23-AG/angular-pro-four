import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen: boolean = false; // Get state from parent

  activeAccordion: number | null = null;

  toggleAccordion(id: number) {
    this.activeAccordion = this.activeAccordion === id ? null : id;
  }
}
