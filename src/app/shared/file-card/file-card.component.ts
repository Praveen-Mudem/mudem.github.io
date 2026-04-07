import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent {
  @Input() document: any;
  @Output() delete = new EventEmitter<any>();
  @Output() download = new EventEmitter<any>();

  onDelete() {
    this.delete.emit(this.document);
  }

  onDownload() {
    this.download.emit(this.document);
  }

  isImageFile(fileType: string): boolean {
    return fileType === '.jpg' || fileType === '.jpeg' || fileType === '.png';
  }

  isVideoFile(fileType: string): boolean {
    return fileType === '.mp4' || fileType === 'mp4' || fileType === 'video/mp4';
  }

  isPdfFile(fileType: string): boolean {
    return fileType === '.pdf' || fileType === 'pdf';
  }
}
