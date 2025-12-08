export interface FolderInfo {
  FolderId: number;
  Name: string;
  Description: string;
  UniqueId?: string;
  Password?: string;
  CreatedOn?: string;
  UpdatedOn?: string;
  ShareUrl?: string;
  ValidatedAt?: string;
  RetrievedAt?: string;
  IsAllowUpload?: boolean;
}

export interface DocumentInfo {
  CreatedOn: string;
  CroppedFilepath: string;
  Description: string;
  DocumentId: number;
  FileName: string;
  FileSize: number;
  FileType: string;
  Filepath: string;
  FolderId: number;
}

export interface ValidationResponse {
  FolderInfo?: FolderInfo;
  IsSaved?: boolean;
  isValid?: boolean;
  ErrorMessage?: string;
  IsAllowUpload?: boolean;
}

export interface getSharedFolderInfoResponse {
  FolderInfo: FolderInfo;
  IsSaved?: boolean;
  ErrorMessage?: string;
  IsAllowUpload?: boolean;
}

export interface SharedFolderResponse {
  FolderInfo: FolderInfo;
  DocumentList?: DocumentInfo[];
  IsSaved?: boolean;
  ErrorMessage?: string;
}

export interface SharedFolderFilesInfoResponse {
  DocumentList?: DocumentInfo[];
  IsSaved?: boolean;
  ErrorMessage?: string;
  IsAllowUpload?: boolean;
}
