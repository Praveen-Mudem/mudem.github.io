import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../model/profile.model';
import { ProfileService } from '../../service/profile.service';
import { ProfileInfoService } from '../../service/profile-info.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-profile-info-add-edit',
  templateUrl: './profile-info-add-edit.component.html',
  styleUrls: ['./profile-info-add-edit.component.scss']
})
export class ProfileInfoAddEditComponent implements OnInit {
    localSessionToken: string = '';
    sourceIdToken: string = '';
    targetIdToken: string = '';
    applicationToken: string = '';
  @Input() profile: Profile = { ProfileId: 0, Name: '', DateOfBirth: '' };
  @Input() isEdit: boolean = false;
  @Output() save = new EventEmitter<Profile>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private profileService: ProfileService,
    private toast: ToastService,
    private router: Router,
    private profileInfoService: ProfileInfoService
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.profile = nav.extras.state['profile'] || this.profile;
      this.isEdit = nav.extras.state['isEdit'] || false;
    }
  }

  ngOnInit(): void {
    this.getMyOverviewInfo();
    this.loadApplicationToken();
  }

  getMyOverviewInfo() {
    this.profileInfoService.getMyOverviewInfo().subscribe({
      next: (res) => {
        this.localSessionToken = res.UserInfo.LocalSession;
        this.sourceIdToken = res.UserInfo.SourceId;
        this.targetIdToken = res.UserInfo.TargetId;
        this.toast.show('Overview info loaded.', 'success');
      },
      error: () => {
        this.toast.show('Failed to load overview info.', 'error');
      }
    });
  }
  loadApplicationToken() {
    this.profileInfoService.getApplicationTokenInfo().subscribe({
      next: (res) => {
        this.applicationToken = res?.ResultInfo?.Result || '';
      },
      error: () => {
        this.toast.show('Failed to load application token.', 'error');
      }
    });
  }


  refreshToken(showToast: boolean = true) {
    this.profileInfoService.generateNewToken().subscribe({
      next: (res) => {
        const token = res?.Result || '';
        this.localSessionToken = token;
        this.sourceIdToken = token;
        this.targetIdToken = token;
        if (showToast) this.toast.show(`Tokens refreshed.`, 'success');
      },
      error: () => {
        if (showToast) this.toast.show(`Failed to refresh tokens.`, 'error');
      }
    });
  }
  onSubmit() {
    if (this.isEdit) {
      this.profileService.saveProfileInfo(this.profile).subscribe({
        next: () => {
          this.toast.show('Profile updated successfully.', 'success');
          this.profileService.getProfileList().subscribe(() => {
            this.router.navigate(['/profile']);
          });
        },
        error: () => {
          this.toast.show('Failed to update profile.', 'error');
        }
      });
    } else {
      this.profileService.saveProfileInfo(this.profile).subscribe({
        next: () => {
          this.toast.show('Profile added successfully.', 'success');
          this.profileService.getProfileList().subscribe(() => {
            this.router.navigate(['/profile']);
          });
        },
        error: () => {
          this.toast.show('Failed to add profile.', 'error');
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
    this.router.navigate(['/profile']);
  }
}
