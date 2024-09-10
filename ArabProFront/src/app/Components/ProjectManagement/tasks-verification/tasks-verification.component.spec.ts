import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksVerificationComponent } from './tasks-verification.component';

describe('TasksVerificationComponent', () => {
  let component: TasksVerificationComponent;
  let fixture: ComponentFixture<TasksVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
