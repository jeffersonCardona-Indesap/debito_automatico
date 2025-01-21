import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFailedComponent } from './session-failed.component';

describe('SessionFailedComponent', () => {
  let component: SessionFailedComponent;
  let fixture: ComponentFixture<SessionFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionFailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
