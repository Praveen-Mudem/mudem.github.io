import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FolderInfo } from '../../model/folder.module';
import { FolderService } from '../../service/folder.service';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-folder-add-edit',
  templateUrl: './folder-add-edit.component.html',
  styleUrls: ['./folder-add-edit.component.scss']
})
export class FolderAddEditComponent implements OnInit {
  @Input() folder: FolderInfo = {
    FolderId: 0,
    Name: '',
    Description: '',
    UniqueId: '',
    Password: '',
    CreatedOn: '',
    UpdatedOn: ''
  };
  @Input() isEdit: boolean = false;
  @Output() save = new EventEmitter<FolderInfo>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();

  folderForm!: FormGroup;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private folderService: FolderService,
    private confirmDialog: ConfirmDialogService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.isEdit = true;
      this.loadFolderData(+id);
    } else {
      this.isEdit = false;
      this.initForm();
    }
  }

  loadFolderData(folderId: number) {
    // Try to get folder data from router state first
    const folderData = window.history.state?.folderData;
    
    if (folderData) {
      this.folder = folderData;
      this.initForm();
    } else {
      // Fallback to API call
      this.folderService.getFolderById(folderId).subscribe({
        next: (folder) => {
          this.folder = folder || this.folder;
          this.initForm();
        },
        error: () => {
          this.toast.show('Failed to load folder details', 'error');
          this.router.navigate(['/folder']);
        }
      });
    }
  }

  initForm() {
    this.folderForm = this.fb.group({
      Name: [this.folder.Name, [Validators.required, Validators.minLength(2)]],
      Description: [this.folder.Description, [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.folderForm.valid) {
      const formValue = this.folderForm.value;
      const folder: FolderInfo = {
        ...this.folder,
        FolderId: this.isEdit ? this.folder.FolderId : 0,
        Name: formValue.Name,
        Description: formValue.Description
      };
      this.folderService.saveFolderInfo(folder).subscribe({
        next: () => {
          this.toast.show(this.isEdit ? 'Folder updated successfully.' : 'Folder added successfully.', 'success');
          this.router.navigate(['/folder']);
        },
        error: () => {
          this.toast.show('Error while processing your request, please contact administrator!', 'error');
        }
      });
    } else {
      this.toast.show('Error while processing your request, please contact administrator!', 'error');
    }
  }

  onCancel() {
    this.router.navigate(['/folder']);
  }

  async onDelete() {
    if (this.isEdit && this.folder.FolderId) {
      const result = await this.confirmDialog.confirm(`Are you sure you want to delete the folder "${this.folder.Name}"?`);
      if (result) {
        this.folderService.deleteFolderInfo(this.folder.FolderId).subscribe(() => this.router.navigate(['/folder']));
      }
    }
  } 
}
