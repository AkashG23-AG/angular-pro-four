import { Component, Renderer2 } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: false,
})
export class UserComponent {

  accordions: any[] = [
    {
      name: 'Accordion 1',
      text: 'Morbi congue laoreet imperdiet. Pellentesque viverra molestie velit. Aenean gravida lacus vitae purus maximus, at sodales quam fringilla. '
    },
    {
      name: 'Accordion 2',
      text: 'Morbi congue laoreet imperdiet. Pellentesque viverra molestie velit. Aenean gravida lacus vitae purus maximus, at sodales quam fringilla. '
    },
      {
      name: 'Accordion 3',
      text: 'Morbi congue laoreet imperdiet. Pellentesque viverra molestie velit. Aenean gravida lacus vitae purus maximus, at sodales quam fringilla. '
    },
      {
      name: 'Accordion 4',
      text: 'Morbi congue laoreet imperdiet. Pellentesque viverra molestie velit. Aenean gravida lacus vitae purus maximus, at sodales quam fringilla. '
    }
  ];
  activeIndex!: number;

  toggleClass(event:any, i: number) {
    event.preventDefault();
    console.log(event)
    this.activeIndex = i;

    console.log(this.activeIndex);
  }

  userInput: string = '';
  displayedText: string = '';
  userName:string ='';
  userText:string='';

  displayText() {
    this.displayedText = this.userInput;
    this.userText = this.userName;
  }

  // classActive: boolean = false;

  // toggleClass(event: { preventDefault: () => void; }) {
  //     event.preventDefault();
  //     this.classActive = !this.classActive;
  // }

  myForm: FormGroup;

  name = new FormControl('');
  updateNames() {
    this.name.setValue('Nancy');
  }

  // isHovered: boolean = false;
  isActive: boolean = false;

  // onHover(state: boolean) {
  //   this.isHovered = state;
  // }

  isHovered: number | null = null; // Track open dropdown (1 or 2)
  toggleActive(id:number):void{
    this.isHovered = this.isHovered === id ? null : id;
  }

  // toggleActive() {
  //   this.isActive = !this.isActive;
  // }

  // Static Menu Data
  menuItems = [
    {
      name: 'Item 1',
      open: false,
      children: [
        { name: 'Sub Item 1.1', open: false, children: ['Option 1', 'Option 2'] },
        { name: 'Sub Item 1.2', open: false, children: ['Option 3', 'Option 4'] }
      ]
    },
    {
      name: 'Item 2',
      open: false,
      children: [
        { name: 'Sub Item 2.1', open: false, children: ['Option 5', 'Option 6'] },
        { name: 'Sub Item 2.2', open: false, children: ['Option 7', 'Option 8'] }
      ]
    }
  ];

  // // Toggle Main Dropdown
  // toggleDropdown(index: number): void {
  //   this.menuItems[index].open = !this.menuItems[index].open;
  // }

  // Toggle Nested Dropdown
  toggleSubDropdown(parentIndex: number, childIndex: number): void {
    this.menuItems[parentIndex].children[childIndex].open = 
      !this.menuItems[parentIndex].children[childIndex].open;
  }

  constructor() {
    this.myForm = new FormGroup({
      // Define your form controls here
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('')
    });
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.myForm.value);
  }

  // isOpened:boolean=true;
  
  isOpened: number | null = null; // Track open dropdown (1 or 2)
  onToggel(id:number):void{
    // this.isOpened = this.isOpened;
    this.isOpened = this.isOpened === id ? null : id;
  }

  activeDropdown: number | null = null; // Track open dropdown (1 or 2)

  toggleDropdown(id: number): void {
    this.activeDropdown = this.activeDropdown === id ? null : id;
  }

  // name = new FormControl('');
  // updateName() {
  //   this.name.setValue('Nancy');
  // }
  
  // males: any[];
  // females: any[];
  // Yeileds: any[];


  // constructor(private renderer: Renderer2) {
  //   this.males = [];
  //   for (let i = 1; i <= 10; i++) {
  //     const isActive = i <= 5; // First 20 items are considered active
  //     const color = isActive ? '#247ba0' : 'gray';
  //     this.males.push({ number: "", isActive, color });
  //   }


  //   this.females = [];
  //   for (let i = 1; i <= 10; i++) {
  //     const isActive = i <= 8; // First 20 items are considered active
  //     const color = isActive ? '#f25f5c' : 'gray';
  //     this.females.push({ number: "", isActive, color });
  //   }

    
  //   this.Yeileds = [];
  //   for (let i = 1; i <= 10; i++) {
  //     const isActive = i <= 5; // First 20 items are considered active
  //     const color = isActive ? '#f25f5c' : 'gray';
  //     this.Yeileds.push({ number: "", isActive, color });
  //   }
  // }

  // // Method to get count of active items
  // getActiveMaleCount(): number {
  //   return this.males.filter(male => male.isActive).length;
  // }
  // // Method to get count of active items
  // getActiveFemaleCount(): number {
  //   return this.females.filter(female => female.isActive).length;
  // }

  //   // Method to get count of active items
  //   getActiveYeiledCount(): number {
  //     return this.Yeileds.filter(Yeiled => Yeiled.isActive).length;
  //   }
  
}
