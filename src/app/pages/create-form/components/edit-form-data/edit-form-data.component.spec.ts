import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormDataComponent } from './edit-form-data.component';

describe('EditFormDataComponent', () => {
  let component: EditFormDataComponent;
  let fixture: ComponentFixture<EditFormDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFormDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
