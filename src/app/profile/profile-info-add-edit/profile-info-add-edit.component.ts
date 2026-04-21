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
  fileCopyToken: string = '';
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
    private profileInfoService: ProfileInfoService,
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
    this.getFileCopyToken();
  }

  getFileCopyToken() {
    this.profileInfoService.getFileCopyTokenInfo().subscribe({
      next: (res: any) => {
        this.fileCopyToken = res?.Result || '';
      },
      error: () => {
        this.fileCopyToken = 'Error fetching token';
      }
    });
  }

  getMyOverviewInfo() {
    this.profileInfoService.getMyOverviewInfo().subscribe({
      next: (res) => {
        this.localSessionToken = res.UserInfo.LocalSession;
        this.sourceIdToken = res.UserInfo.SourceId;
        this.targetIdToken = res.UserInfo.TargetId;
      },
      // error: () => {
      //   this.toast.show('Failed to load overview info.', 'error');
      // }
    });
  }
  loadApplicationToken() {
    this.profileInfoService.getApplicationTokenInfo().subscribe({
      next: (res) => {
        this.applicationToken = res?.ResultInfo?.Result || '';
      },
      // error: () => {
      //   this.toast.show('Failed to load application token.', 'error');
      // }
    });
  }

  refreshToken(value: string) {
    const payload = {
      Key: value
    };

    this.profileInfoService.generateNewToken(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.Result !== '') {
          this.toast.show(`Tokens refreshed.`, 'success');
          this.getMyOverviewInfo()
        }
      },
      // error: () => {
      //   this.toast.show(`Failed to refresh tokens.`, 'error');
      // }
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

  copyToken(value: string): void {
    if (!value) return;

    navigator.clipboard.writeText(value);
    this.toast.show('Copied!');
  }


}
