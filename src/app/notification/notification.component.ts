import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { ToastService } from '../service/toast.service';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { LoaderService } from '../service/loader.service';
import { Notification } from '../model/notification.model';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  noteList: Notification[] = [];
  loading = true;
  errorMsg = '';
  showAddEdit = false;
  editNote: Notification | null = null;
  isEdit = false;
  RemainderTypeList: any[] = [];

  // AG-Grid properties
  private gridApi!: GridApi;
  
  columnDefs: ColDef[] = [
    { field: 'Date', headerName: 'Date', sortable: true, filter: true, width: 120 },
    { field: 'Time', headerName: 'Time', sortable: true, filter: true, width: 100 },
    { field: 'Title', headerName: 'Title', sortable: true, filter: true, flex: 1 },
    { field: 'Description', headerName: 'Description', sortable: true, filter: true, flex: 2 },
    { field: 'RemainderType', headerName: 'Reminder Type', sortable: true, filter: true, width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        const eDiv = document.createElement('div');
        eDiv.className = 'btn-group btn-group-sm';
        eDiv.setAttribute('role', 'group');
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-outline-primary btn-sm';
        editBtn.title = 'Edit Note';
        editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
        editBtn.addEventListener('click', () => this.onEdit(params.data));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-outline-danger btn-sm';
        deleteBtn.title = 'Delete Note';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        deleteBtn.addEventListener('click', () => this.onDelete(params.data));
        
        eDiv.appendChild(editBtn);
        eDiv.appendChild(deleteBtn);
        
        return eDiv;
      },
      width: 120,
      sortable: false,
      filter: false,
      pinned: 'right'
    }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: false,
    minWidth: 100
  };

  constructor(
    private notificationService: NotificationService,
    private toast: ToastService,
    private confirmDialog: ConfirmDialogService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadNotes();
    this.loadRemainderTypes();
  }

  loadNotes() {
    this.loaderService.show();
    this.notificationService.getNoteList().subscribe({
      next: (result) => {
        this.noteList = result?.NoteList || result || [];
        this.loaderService.hide();
      },
      error: () => {
        this.errorMsg = 'Failed to load notes.';
        this.loaderService.hide();
      }
    });
  }

  loadRemainderTypes() {
    // Use getNoteInfo with noteId=0 or a dedicated API if available
    this.notificationService.getNoteInfo(0).subscribe({
      next: (result) => {
        if (result && result.RemainderTypeList) {
          this.RemainderTypeList = result.RemainderTypeList;
        }
      }
    });
  }

  getRemainderTypeName(id: number): string {
    const type = this.RemainderTypeList.find(t => t.Id === id);
    return type ? type.Name : '';
  }

  onAdd() {
    this.editNote = {
      NoteId: 0,
      Date: '',
      Time: '',
      Title: '',
      Description: '',
      RemainderTypeId: 0
    };
    this.isEdit = false;
    this.showAddEdit = true;
  }

  onEdit(note: Notification) {
    this.editNote = { ...note };
    this.isEdit = true;
    this.showAddEdit = true;
  }

  async onDelete(note: Notification) {
    const result = await this.confirmDialog.confirm(`Are you sure you want to delete the notification "${note.Title}"?`);
    if (result) {
      this.notificationService.deleteNoteInfo(note.NoteId).subscribe({
        next: () => {
          this.toast.show('Note deleted successfully', 'success');
          this.loadNotes();
        },
        error: () => {
          this.toast.show('Failed to delete note', 'error');
        }
      });
    }
  }

  onSave(note: Notification) {
    this.notificationService.saveNoteInfo(note).subscribe({
      next: () => {
        this.toast.show(this.isEdit ? 'Note updated successfully' : 'Note added successfully', 'success');
        this.showAddEdit = false;
        this.loadNotes();
      },
      error: () => {
        this.toast.show('Failed to save note', 'error');
      }
    });
  }

  onCancel() {
    this.showAddEdit = false;
  }

  // AG-Grid event handlers
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    console.log('Grid is ready');
    params.api.sizeColumnsToFit();
  }

  onCellClicked(event: any) {
    // Cell click events are now handled directly in the cell renderer
    console.log('Cell clicked:', event);
  }
}
