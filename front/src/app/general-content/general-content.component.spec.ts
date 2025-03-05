import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralContentComponent } from './general-content.component';

describe('GeneralContentComponent', () => {
  let component: GeneralContentComponent;
  let fixture: ComponentFixture<GeneralContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
