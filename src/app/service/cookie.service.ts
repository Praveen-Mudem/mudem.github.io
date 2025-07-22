import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  setCookie(name: string, value: string, days?: number): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  eraseCookie(name: string): void {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  setObject(name: string, value: any, days?: number): void {
    this.setCookie(name, JSON.stringify(value), days);
  }

  getObject(name: string): any {
    const value = this.getCookie(name);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error('Error parsing cookie value:', error);
        return null;
      }
    }
    return null;
  }

  // Specific method for shared folder info
  getSharedFolderInfo(): any {
    return this.getObject('sharedFolderInfo');
  }

  // Check if shared folder access is valid
  isSharedFolderAccessValid(folderId?: string): boolean {
    const storedInfo = this.getSharedFolderInfo();
    if (!storedInfo) return false;
    
    // If folderId is provided, check if it matches
    if (folderId && storedInfo.UniqueId !== folderId) return false;
    
    // Check if the stored info is not older than 1 day
    const validatedAt = new Date(storedInfo.ValidatedAt);
    const now = new Date();
    const daysDiff = (now.getTime() - validatedAt.getTime()) / (1000 * 3600 * 24);
    
    return daysDiff < 1;
  }

  // Clear shared folder info
  clearSharedFolderInfo(): void {
    this.eraseCookie('sharedFolderInfo');
  }
}
