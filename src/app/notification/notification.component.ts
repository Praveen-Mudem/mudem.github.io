import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { ToastService } from '../service/toast.service';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { Notification } from '../model/notification.model';

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

  constructor(
    private notificationService: NotificationService,
    private toast: ToastService,
    private confirmDialog: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.loadNotes();
    this.loadRemainderTypes();
  }

  loadNotes() {
    this.loading = true;
    this.notificationService.getNoteList().subscribe({
      next: (result) => {
        this.noteList = result?.NoteList || result || [];
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load notes.';
        this.loading = false;
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
}
