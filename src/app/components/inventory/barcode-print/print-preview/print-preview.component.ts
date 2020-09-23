import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.css']
})
export class PrintPreviewComponent implements OnInit {
  DialogTitle :any = "";
  constructor(public dialogRef: MatDialogRef<PrintPreviewComponent>, @Inject(MAT_DIALOG_DATA) private data) {
    this.BarcodePrintingArray = data.barcodeArray;
  }
  BarcodePrintingArray: any = [];
  ngOnInit() {
    console.log(this.BarcodePrintingArray)
  }

  close() {
    this.dialogRef.close();
  }
}
