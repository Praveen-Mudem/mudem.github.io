import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../../model/profile.model';
import { ProfileService } from '../../service/profile.service';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-profile-info-add-edit',
  templateUrl: './profile-info-add-edit.component.html',
  styleUrls: ['./profile-info-add-edit.component.scss']
})
export class ProfileInfoAddEditComponent {
  @Input() profile: Profile = { ProfileId: 0, Name: '', DateOfBirth: '' };
  @Input() isEdit: boolean = false;
  @Output() save = new EventEmitter<Profile>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private profileService: ProfileService,
    private toast: ToastService,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.profile = nav.extras.state['profile'] || this.profile;
      this.isEdit = nav.extras.state['isEdit'] || false;
    }
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
