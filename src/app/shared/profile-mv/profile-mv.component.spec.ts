import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMvComponent } from './profile-mv.component';

describe('ProfileMvComponent', () => {
  let component: ProfileMvComponent;
  let fixture: ComponentFixture<ProfileMvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileMvComponent]
    });
    fixture = TestBed.createComponent(ProfileMvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
