import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandInfoDialogComponent } from './demand-info-dialog.component';

describe('DemandInfoDialogComponent', () => {
  let component: DemandInfoDialogComponent;
  let fixture: ComponentFixture<DemandInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
