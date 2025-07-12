// [HttpPost("uploadDocuments")]
//         public IActionResult UploadDocuments([FromHeader] int folderId,List<IFormFile> fileList)
//         {
//             if (_isValidRequest && _headerInfo.ProfileId > 0 && folderId > 0) 
//             {
//                 BaseViewData response = new BaseViewData();
//                 response.IsSaved = false;
//                 try
//                 {
//                     if (fileList != null && fileList.Count > 0)
//                     {

//                         List<DocumentData> documentList = new List<DocumentData>();
//                         foreach (IFormFile fileInfo in fileList)
//                         {
//                             DocumentData documentInfo = new DocumentData();
//                             if (fileInfo.FileName.ToLower().EndsWith(".mp4"))
//                             {
//                                 string userRootPath = string.Format("{0}{1}", mpkAppSettingData.AppSettings?.VideoFolderPath, _headerInfo.UserId);
//                                 if (!Directory.Exists(userRootPath))
//                                 {
//                                     Directory.CreateDirectory(userRootPath);
//                                 }
//                                 userRootPath = string.Format("{0}\\{1}", userRootPath + _headerInfo.ProfileId);
//                                 if (!Directory.Exists(userRootPath))
//                                 {
//                                     Directory.CreateDirectory(userRootPath);
//                                 }
//                                 string filename = Guid.NewGuid().ToString() + Path.GetExtension(fileInfo.FileName);
//                                 string filefullpath = string.Format("{0}\\{1}", userRootPath, filename);
//                                 using (Stream fileStream = new FileStream(filefullpath, FileMode.Create))
//                                 {
//                                     fileInfo.CopyTo(fileStream);
//                                 }
//                                 FileInfo docInfo = new FileInfo(filefullpath);
//                                 documentInfo.FileName = fileInfo.Name;
//                                 documentInfo.Filepath = filename;
//                                 documentInfo.FileType = docInfo.Extension;
//                                 documentInfo.FileSize = docInfo.Length;
//                                 documentInfo.FolderId = folderId;
//                                 documentList.Add(_documentService.InsertDocumentInfo(documentInfo));
//                             }
//                             else if (fileInfo.FileName.ToLower().EndsWith(".pdf"))
//                             {
//                                 string userRootPath = string.Format("{0}{1}", mpkAppSettingData.AppSettings?.FileFolderPath, _headerInfo.UserId);
//                                 if (!Directory.Exists(userRootPath))
//                                 {
//                                     Directory.CreateDirectory(userRootPath);
//                                 }
//                                 userRootPath = string.Format("{0}\\{1}", userRootPath + _headerInfo.ProfileId);
//                                 if (!Directory.Exists(userRootPath))
//                                 {
//                                     Directory.CreateDirectory(userRootPath);
//                                 }
//                                 string filename = Guid.NewGuid().ToString() + Path.GetExtension(fileInfo.FileName);
//                                 string filefullpath = string.Format("{0}\\{1}", userRootPath, filename);
//                                 using (Stream fileStream = new FileStream(filefullpath, FileMode.Create))
//                                 {
//                                     fileInfo.CopyTo(fileStream);
//                                 }
//                                 FileInfo docInfo = new FileInfo(filefullpath);
//                                 documentInfo.FileName = fileInfo.Name;
//                                 documentInfo.Filepath = filename;
//                                 documentInfo.FileType = docInfo.Extension;
//                                 documentInfo.FileSize = docInfo.Length;
//                                 documentInfo.FolderId = folderId;
//                                 documentList.Add(_documentService.InsertDocumentInfo(documentInfo));
//                             }
//                             else if (fileInfo.FileName.ToLower().EndsWith(".jpg") || fileInfo.FileName.ToLower().EndsWith(".jpeg") || fileInfo.FileName.ToLower().EndsWith(".png"))
//                             {
//                                 string userRootPath = string.Format("{0}{1}", mpkAppSettingData.AppSettings?.ImageFolderPath, _headerInfo.UserId);
//                                 if (!Directory.Exists(userRootPath))
//                                 {
//                                     Directory.CreateDirectory(userRootPath);
//                                 }
//                                 userRootPath = string.Format("{0}\\{1}", userRootPath + _headerInfo.ProfileId);
//                                 if (!Directory.Exists(userRootPath))
//                                 {
//                                     Directory.CreateDirectory(userRootPath);
//                                 }
//                                 string filename = Guid.NewGuid().ToString() + Path.GetExtension(fileInfo.FileName);
//                                 string filefullpath = string.Format("{0}\\{1}", userRootPath, filename);
//                                 using (Stream fileStream = new FileStream(filefullpath, FileMode.Create))
//                                 {
//                                     fileInfo.CopyTo(fileStream);
//                                 }
//                                 FileInfo docInfo = new FileInfo(filefullpath);
//                                 documentInfo.FileName = fileInfo.Name;
//                                 documentInfo.Filepath = filename;
//                                 documentInfo.FileType = docInfo.Extension;
//                                 documentInfo.FileSize = docInfo.Length;
//                                 documentInfo.FolderId = folderId;
//                                 documentList.Add(_documentService.InsertDocumentInfo(documentInfo));
//                             }
//                         }
//                         response.IsSaved = documentList.Count > 0;
//                         return Ok(response);
//                     }
//                     else
//                     {
//                         response.ErrorMessage = "No files to upload";
//                     }

//                     return Ok(response);
//                 }
//                 catch (Exception ex)
//                 {
//                     _logger.LogException(_headerInfo, "Exception at UploadDocuments", ex);
//                     mpkTextLogger.WriteEventLog(ex);
//                     response.ErrorMessage = "Error while provessing your request. Please try again.";
//                     return Ok(response);
//                 }
//             }
//             else
//             {
//                 return BadRequest();
//             }
//         }