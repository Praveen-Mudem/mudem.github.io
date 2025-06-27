import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProfileInfoAddEditComponent } from '../profile-info-add-edit/profile-info-add-edit.component';

describe('ProfileInfoAddEditComponent', () => {
  let component: ProfileInfoAddEditComponent;
  let fixture: ComponentFixture<ProfileInfoAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileInfoAddEditComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileInfoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when name is empty', () => {
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('input[name="name"]');
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form').checkValidity()).toBeFalse();
  });
});
