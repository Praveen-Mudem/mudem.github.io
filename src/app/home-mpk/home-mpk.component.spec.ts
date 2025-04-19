import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMpkComponent } from './home-mpk.component';

describe('HomeMpkComponent', () => {
  let component: HomeMpkComponent;
  let fixture: ComponentFixture<HomeMpkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMpkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMpkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
