import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { ToastService } from '../service/toast.service';
import { ConfirmDialogService } from '../service/confirm-dialog.service';

const RemainderTypeList = [
  { Id: 1, Name: 'Day' },
  { Id: 2, Name: 'Week' },
  { Id: 3, Name: 'Month' },
  { Id: 4, Name: 'Year' }
];

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  noteList: any[] = [];
  loading = true;
  errorMsg = '';
  showAddEdit = false;
  editNote: any = null;
  isEdit = false;
  RemainderTypeList = RemainderTypeList;

  constructor(
    private notificationService: NotificationService,
    private toast: ToastService,
    private confirmDialog: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.loadNotes();
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

  getRemainderTypeName(id: number): string {
    const type = this.RemainderTypeList.find(t => t.Id === id);
    return type ? type.Name : '';
  }

  onAdd() {
    this.editNote = { NoteId: 0, Date: '', Time: '', Title: '', Description: '', RemainderTypeId: 0 };
    this.isEdit = false;
    this.showAddEdit = true;
  }

  onEdit(note: any) {
    this.editNote = { ...note };
    this.isEdit = true;
    this.showAddEdit = true;
  }

  async onDelete(note: any) {
    console.log('Deleting note:', note);
    const result = await this.confirmDialog.confirm(`Are you sure you want to delete the notification \"${note.Title}\"?`);
    if (result) {
      this.notificationService.deleteNoteInfo(note.NoteId).subscribe({
        next: (res) => {
          console.log('Delete response:', res);
          this.toast.show('Note deleted successfully', 'success');
          this.loadNotes();
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.toast.show('Failed to delete note', 'error');
        }
      });
    }
  }

  onSave(note: any) {
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
