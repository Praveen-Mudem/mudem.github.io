import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FolderInfo } from '../../model/folder.module';
import { FolderService } from '../../service/folder.service';

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
    private folderService: FolderService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.folderService.getFolderById(+id).subscribe(folder => {
        this.folder = folder || this.folder;
        this.initForm();
      });
    } else {
      this.isEdit = false;
      this.initForm();
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
        next: () => this.router.navigate(['/folder']),
        error: () => this.errorMsg = 'Error while processing your request, please contant administrator!'
      });
    } else {
      this.errorMsg = 'Error while processing your request, please contant administrator!';
    }
  }

  onCancel() {
    this.router.navigate(['/folder']);
  }

  onDelete() {
    if (this.isEdit && this.folder.FolderId) {
      this.folderService.deleteFolderInfo(this.folder.FolderId).subscribe(() => this.router.navigate(['/folder']));
    }
  }
}
