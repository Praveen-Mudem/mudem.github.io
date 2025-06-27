import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProfileDashboardComponent } from '../profile-dashboard/profile-dashboard.component';

describe('ProfileDashboardComponent', () => {
  let component: ProfileDashboardComponent;
  let fixture: ComponentFixture<ProfileDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileDashboardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => key === 'profileId' ? '123' : null })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
