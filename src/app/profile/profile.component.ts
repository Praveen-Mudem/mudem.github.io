import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { ToastService } from '../service/toast.service';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileList: any[] = [];
  loading = true;
  errorMsg = '';
  showAddEdit = false;
  editProfile: any = null;
  isEdit = false;
  loggedInProfileId: string | null = LoginService.getLoggedInProfileId();

  constructor(
    private profileService: ProfileService,
    private toast: ToastService,
    private confirmDialog: ConfirmDialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.profileList$.subscribe(list => {
      // Move the profile with loggedInProfileId to the front
      if (this.loggedInProfileId) {
        const idx = list.findIndex(p => String(p.ProfileId) === this.loggedInProfileId);
        if (idx > 0) {
          const [loggedInProfile] = list.splice(idx, 1);
          list.unshift(loggedInProfile);
        }
      }
      this.profileList = list;
      this.loading = false;
    });
  }

  onAddProfile() {
    this.router.navigate(['/profile-info-add-edit']);
  }

  onEditProfile(profile: any) {
    let date = profile.DateOfBirth;
    if (date && date.includes('-') && date.split('-')[2].length === 4) {
      // If format is DD-MM-YYYY, convert to YYYY-MM-DD
      const [dd, mm, yyyy] = date.split('-');
      date = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
    }
    this.router.navigate(['/profile-info-add-edit'], {
      state: {
        profile: { ...profile, DateOfBirth: date || '' },
        isEdit: true
      }
    });
  }

  onSaveProfile(profile: any) {
    this.profileService.saveProfileInfo(profile).subscribe({
      next: () => {
        this.showAddEdit = false;
        this.toast.show('Profile saved successfully.', 'success');
        this.profileService.getProfileList().subscribe();
      },
      error: () => {
        this.toast.show('Failed to save profile.', 'error');
      }
    });
  }

  onCancelProfile() {
    this.showAddEdit = false;
  }

  async onDeleteProfile(profile: any) {
    const result = await this.confirmDialog.confirm(`Are you sure you want to delete the profile \"${profile.Name}\"?`);
    if (result) {
      this.profileService.deleteProfileInfo(profile.ProfileId).subscribe({
        next: () => {
          this.toast.show('Profile deleted successfully.', 'success');
          this.profileService.getProfileList().subscribe();
        },
        error: () => {
          this.toast.show('Failed to delete profile.', 'error');
        }
      });
    }
  }
}
