import { Component , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-demand-info-dialog',
  templateUrl: './demand-info-dialog.component.html',
  template:`
    <h1 mat-dialog-title>Demand Information</h1>
    <div mat-dialog-content>
      <p><strong>Type:</strong> {{ data.type }}</p>
      <p><strong>Description:</strong> {{ data.description }}</p>
      <p><strong>Date Created:</strong> {{ data.dateCreation | date:'medium' }}</p>
      <!-- Add more fields as necessary -->
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">Close</button>
    </div>
  `,
  styleUrls: ['./demand-info-dialog.component.css']
})
export class DemandInfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DemandInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
