import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';
import { schedulerConfig } from './app.config';
import { CrudManager, DataGenerator, DateHelper, DomHelper, DragHelper, EventModel, Grid, Scheduler, Splitter, } from '@bryntum/scheduler';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';
// import { Scheduler, DateHelper, Grid } from 'bryntum-scheduler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'akash_g24';
  scheduler: Scheduler | undefined;
  grid: Grid | undefined;

  // constructor() { }
  sidebarOpen: boolean = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  isDarkTheme = false;
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.renderer.addClass(document.body, 'light_theme');
    } else {
      this.renderer.removeClass(document.body, 'light_theme');
    }
  }

  darkMode: boolean = true;
  showProfileSidebar: boolean = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.documentElement.classList.toggle('dark');
  }


  userInput: string = '';
  displayedText: string = '';

  displayText() {
    this.displayedText = this.userInput;
  }

 myForm: FormGroup;

  constructor(private renderer: Renderer2) {
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

  ngOnInit(): void {
    this.scheduler = new Scheduler({
      appendTo: 'scheduler-container',
      startDate: new Date(2024, 3, 1, 8),
      endDate: new Date(2024, 3, 1, 18),
      columns: [
        { text: 'Name', field: 'name', width: 350 }
      ],
      resources: [
        { id: 1, name: 'Resource 1' },
        { id: 2, name: 'Resource 2' },
        { id: 3, name: 'Resource 3' }
        // Add more resources as needed
      ],
      events: [
        { id: 1, resourceId: 1, name: 'Event 1', startDate: new Date(2024, 3, 1, 8), endDate: new Date(2024, 3, 1, 10) },
        { id: 2, resourceId: 2, name: 'Event 2', startDate: new Date(2024, 3, 1, 9), endDate: new Date(2024, 3, 1, 12) }
        // Add more events as needed
      ]
    });
    this.grid = new Grid({
      appendTo: 'grid-container',
      autoHeight: true,
      data: [
        { id: 1, name: 'Task 1', startDate: '2024-01-01', endDate: '2024-01-05' },
        { id: 2, name: 'Task 2', startDate: '2024-01-06', endDate: '2024-01-10' },
        { id: 3, name: 'Task 3', startDate: '2024-01-11', endDate: '2024-01-15' }
        // Add more data as needed
      ],
      columns: [
        { text: 'ID', field: 'id', width: 100 },
        { text: 'Name', field: 'name', flex: 1 },
        { text: 'Start Date', field: 'startDate', width: 150 },
        { text: 'End Date', field: 'endDate', width: 150 }
      ]
    });
  }

  
  dropSchedulerData(event: CdkDragDrop<any[]>) {
    const droppedItem = event.item.data;
    // Add logic to add the dropped item as an event to the scheduler
  }
  dropGridData(event: CdkDragDrop<any[]>) {
    const droppedItem = event.item.data;
    // Add logic to handle dropping the item into the scheduler
    // You may want to emit an event to pass the dropped item to the scheduler component
  }
  resources = [
    { id: 1, name: 'Dan Stevenson' },
    { id: 2, name: 'Talisha Babin' },
    { id: 3, name: 'Akash Ghanate' },
    { id: 4, name: 'Tejas Tannu' },
    { id: 5, name: 'Nilesh Kahalkar' }
  ];

  events = [
    { resourceId: 1, startDate: '2024-01-01', endDate: '2024-01-10' },
    { resourceId: 2, startDate: '2024-01-02', endDate: '2024-01-09' },
    { resourceId: 3, startDate: '2024-01-03', endDate: '2024-01-08' },
    { resourceId: 4, startDate: '2024-01-04', endDate: '2024-01-06' },
    { resourceId: 5, startDate: '2024-01-06', endDate: '2024-01-04' }
  ];

  schedulerConfig = schedulerConfig;

  @ViewChild('scheduler') schedulerComponent!: BryntumSchedulerComponent;

  columns = [
    { field: 'name', text: 'Name' },
    { field: 'job', text: 'Job' }
  ]

  data = [
    { name: 'Bill', job: 'Retired' },
    { name: 'Elon', job: 'Visionary' },
    { name: 'Me' }
  ]

  
  isOpenLeftDrawer = false;
  openLeftDrawer() {
    this.isOpenLeftDrawer = !this.isOpenLeftDrawer;
  }

  closeLeftDrawer() {
    this.isOpenLeftDrawer = false;
  }

  isOpenRightDrawer = false;

  openRightDrawer() {
    this.isOpenRightDrawer = !this.isOpenRightDrawer;
  }

  closerightDrawer() {
    this.isOpenRightDrawer = false;
  }



  changesHandler = ({ source } : { source : CrudManager }) => {
    const { changes } = source;

    // In a real app you would send the changes to the server here.
    console.log(changes);

    // Then you would call `source.acceptChanges()` to clear local changes
    source.acceptChanges();
  }

  crudManagerConfig = {
    loadUrl   : 'assets/data.json',
    autoLoad  : true,
    listeners : {
      hasChanges: this.changesHandler
    }
  };

  columnsConfig = [
    {
        field : 'name',
        text  : 'Name'
    },
    {
        field : 'role',
        text  : 'Role',

    }

    
  ];


 

  // data = [
  //   { name: 'Bill', job: 'Retired' },
  //   { name: 'Elon', job: 'Visionary' },
  //   { name: 'Me' }
  // ]

  // @ViewChild('schedulerContainer', { static: true })
  // schedulerContainer!: ElementRef;
  // @ViewChild('gridContainer', { static: true })
  // gridContainer!: ElementRef;

  // scheduler: Scheduler | any;
  // grid: Grid | any;
  // dragHelper: DragHelper | any;

  // ngOnInit() {
  //   // Initialize Scheduler
  //   this.scheduler = new Scheduler({
  //     appendTo: this.schedulerContainer.nativeElement,
  //     width: '100%',
  //     height: 400,
  //     startDate: new Date(2024, 3, 1),
  //     endDate: new Date(2024, 6, 9),
  //     viewPreset: 'dayAndWeek'
  //   });

  //   // Initialize Grid
  //   this.grid = new Grid({
  //     appendTo: this.gridContainer.nativeElement,
  //     width: '100%',
  //     height: 400,
  //     data: [
  //       { id: 1, name: 'Task 1' },
  //       { id: 2, name: 'Task 2' },
  //       { id: 3, name: 'Task 3' }
  //     ],
  //     columns: [{ field: 'name', text: 'Name', flex: 1 }]
  //   });

  //   // Enable draggability on grid rows
  //   this.grid.features.rowDragCreate = true;
  //   this.dragHelper.on('dragEnd', this.onDragEnd.bind(this));

  //   // Initialize DragHelper
  //   this.dragHelper = new DragHelper({
  //     cloneTarget: true,
  //     listeners: {
  //       dragStart: this.onDragStart.bind(this),
  //       dragMove: this.onDragMove.bind(this),
  //       onDragMove: this.onDragMove.bind(this)
  //     }
  //   });

  //   // Attach DragHelper to the grid container
  //   this.dragHelper.attachTo(this.gridContainer.nativeElement);

  //   // Prevent default dragover behavior on the scheduler
  //   this.schedulerContainer.nativeElement.addEventListener('dragover', (event:any) => {
  //     event.preventDefault();
  //   });

  //   // Handle drop event on the scheduler
  //   this.schedulerContainer.nativeElement.addEventListener('drop', (event:any) => {
  //     event.preventDefault();
  //     const data = JSON.parse(event.dataTransfer.getData('text/plain'));
  //     this.scheduler.eventStore.add({
  //       id: data.id,
  //       name: data.name,
  //       startDate: new Date(data.startDate),
  //       endDate: new Date(data.endDate)
  //     });
  //   });
  // }

  // onDragStart(event: any) {
  //   const record = event.source.record;
  //   event.dataTransfer.setData('text/plain', JSON.stringify({
  //     id: record.id,
  //     name: record.name,
  //     startDate: this.scheduler.startDate.toISOString(),
  //     endDate: this.scheduler.endDate.toISOString()
  //   }));
  // }

  // onDragMove(event: any) {
  //   const previewElement = this.schedulerContainer.nativeElement.querySelector('.custom-drag-preview');
  //   if (previewElement) {
  //     this.renderer.setStyle(previewElement, 'left', `${event.clientX}px`);
  //     this.renderer.setStyle(previewElement, 'top', `${event.clientY}px`);
  //   }
  // }

  // onDragOver(event: DragEvent) {
  //   event.preventDefault();
  // }

  // onDragEnd(event: any) {
  //   // Handle drag end events if needed
  //   this.updateUI();

  //   // Or save changes to the server
  //   this.saveChanges();

  //   // Or trigger additional operations
  //   this.triggerOperations();
  // }
  // triggerOperations() {
  //   throw new Error('Method not implemented.');
  // }
  // saveChanges() {
  //   throw new Error('Method not implemented.');
  // }
  // updateUI() {
  //   throw new Error('Method not implemented.');
  // }
  // @ViewChild('scheduler', { static: true })
  // schedulerRef!: ElementRef;
  // @ViewChild('grid', { static: true })
  // gridRef!: ElementRef;

  // scheduler: Scheduler | any;
  // grid: Grid | any;
  // dragHelper: DragHelper | any ;

  // ngOnInit() {
  //   // Initialize Scheduler

  //   this.initializeScheduler();
  //   this.initializeGrid();

  // }

  
  // initializeScheduler(): void {
  //   this.scheduler = new Scheduler({
  //     // appendTo: this.schedulerRef.nativeElement,
  //     startDate: new Date(2022, 3, 1),
  //     endDate: new Date(2022, 3, 6),
  //     columns: [
  //       { text: 'Name', field: 'name', width: 150 }
  //     ],
  //     features: {
  //       eventDragCreate: true // Disable event creation by drag and drop on scheduler
  //     },
  //     appendTo: this.schedulerRef.nativeElement,
  //     // other scheduler configurations
  //     events: [
  //       { id: 1, name: 'Event 1', startDate: '2022-04-01T08:00:00', endDate: '2022-04-01T10:00:00' },
  //       { id: 2, name: 'Event 2', startDate: '2022-04-01T11:00:00', endDate: '2022-04-01T13:00:00' },
  //       { id: 3, name: 'Event 3', startDate: '2022-04-01T14:00:00', endDate: '2022-04-01T16:00:00' }
  //     ],
  //     resources: [
  //       { id: 1, name: 'Resource 1' },
  //       { id: 2, name: 'Resource 2' },
  //       { id: 3, name: 'Resource 3' }
  //     ]
  //   });
  // }

  // initializeGrid(): void {
  //    // Initialize Grid
  //    this.grid = new Grid({
  //     appendTo: this.gridRef.nativeElement,
  //     flex: '1 1 auto',
  //     data: [
  //       { id: 1, name: 'Task 1' },
  //       { id: 2, name: 'Task 2' },
  //       { id: 3, name: 'Task 3' }
  //     ],
  //     columns: [
  //       { field: 'name', text: 'Name', flex: 1 }
  //     ],
  //     // features: {
  //     //   rowDrag: {
  //     //     showTooltip: true,
  //     //     validator: (draggedRecords:any, targetRecord:any, position:any) => {
  //     //       // Allow dropping only on the scheduler
  //     //       return !!targetRecord.scheduler;
  //     //     }
  //     //   }
  //     // },
  //     // features: {
  //     //   // Enable row drag feature to make grid rows draggable
  //     //   rowDrag: true
  //     // }
  //   });
  //   this.dragHelper = new DragHelper({
  //     source: this.grid,
  //     appendTo: document.body,
  //     describe: (info: { records: { name: any; }[]; }) => {
  //       return `${info.records[0].name}`;
  //     }
  //   });

  //   // Handle drop event
  //   this.dragHelper.on({
  //     onDrop({ context, event }: { context: any, event: any }) {
  //       const { schedule } = this;
  //       const { task, target, resource, valid, element } = context;
      
  //       // If drop was done in a valid location, set the startDate and transfer the task to the Scheduler event store
  //       if (valid && target) {
  //         const coordinate = DomHelper[`getTranslate${schedule.isHorizontal ? 'X' : 'Y'}`](element);
  //         const date = schedule.getDateFromCoordinate(coordinate, 'round', false);
      
  //         if (date) {
  //           // Remove from grid first so that the data change
  //           // below does not fire events into the grid.
  //           this.grid.store.remove(task);
      
  //           task.startDate = date;
  //           task.assign(resource);
  //           schedule.eventStore.add(task);
  //         }
  //       }
      
  //       schedule.disableScrollingCloseToEdges(schedule.timeAxisSubGrid);
  //       schedule.features.eventTooltip.disabled = false;
  //     }
  //   });
  // }
    

    

}







