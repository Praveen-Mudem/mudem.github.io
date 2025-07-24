import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit, OnDestroy {
  @Input() isVisible: boolean = false;
  @Input() document: any = null;
  @Output() closeViewer = new EventEmitter<void>();

  safeUrl: SafeResourceUrl | null = null;
  fileType: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.document) {
      this.initializeViewer();
    }
  }

  ngOnDestroy() {
    this.closeViewer.emit();
  }

  initializeViewer() {
    if (this.document?.Filepath) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.document.Filepath);
      this.fileType = this.getFileType(this.document.FileType);
    }
  }

  getFileType(fileType: string): string {
    const type = fileType?.toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(type)) {
      return 'image';
    } else if (['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', 'mp4'].includes(type)) {
      return 'video';
    } else if (['.pdf', 'pdf'].includes(type)) {
      return 'pdf';
    }
    return 'unknown';
  }

  onClose() {
    this.closeViewer.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  downloadFile() {
    if (this.document?.Filepath) {
      const link = document.createElement('a');
      link.href = this.document.Filepath;
      link.download = this.document.FileName || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  fullscreenMode() {
    const element = document.querySelector('.file-viewer-content');
    if (element?.requestFullscreen) {
      element.requestFullscreen();
    }
  }
}
