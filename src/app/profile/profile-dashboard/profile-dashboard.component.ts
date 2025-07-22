import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { NotificationService } from '../../service/notification.service';
import { LoaderService } from '../../service/loader.service';
import { Subscription } from 'rxjs';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit, OnDestroy {
  dashboardNotes: any[] = [];
  loading: boolean = false;
  errorMsg: string = '';
  private subscription: Subscription = new Subscription();

  // AG-Grid properties
  private gridApi!: GridApi;
  
  columnDefs: ColDef[] = [
    { field: 'Date', headerName: 'Date', sortable: true, filter: true, width: 120 },
    { field: 'Time', headerName: 'Time', sortable: true, filter: true, width: 100 },
    { field: 'Title', headerName: 'Title', sortable: true, filter: true, flex: 1 },
    { field: 'Description', headerName: 'Description', sortable: true, filter: true, flex: 2 }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: false,
    minWidth: 100
  };

  gridOptions = {
    pagination: true,
    paginationPageSize: 10,
    animateRows: true,
    suppressCellFocus: true,
    rowSelection: 'single',
    domLayout: 'normal'
  };

  constructor(
    public commonService: CommonService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loadDashboardNotes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get selectedProfileName(): string | null {
    return this.commonService.selectedProfileName;
  }

  loadDashboardNotes() {
    this.loaderService.show();
    this.errorMsg = '';
    
    const sub = this.notificationService.getDashBoardNoteInfo().subscribe({
      next: (response) => {
        //console.log('Dashboard notes response:', response);        
        if (response && response.NoteList) {
          this.dashboardNotes = response.NoteList;
          //console.log('Dashboard notes loaded:', this.dashboardNotes);
        } else {
          this.dashboardNotes = [];
        }
        
        this.loaderService.hide();
      },
      error: (error) => {
        //console.error('Error fetching dashboard notes:', error);
        this.errorMsg = 'Failed to load dashboard notes. Please try again.';
        this.loaderService.hide();
      }
    });
    
    this.subscription.add(sub);
  }

  // AG-Grid event handlers
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    //console.log('Grid is ready:', params);
    //console.log('Row data:', this.dashboardNotes);
    // Auto-size columns to fit content
    params.api.sizeColumnsToFit();
  }

  onCellClicked(event: any) {
    //console.log('Cell clicked:', event);
  }

 
}