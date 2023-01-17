import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from './../base/base-dialog';
import { Component, OnDestroy, Inject } from '@angular/core';


declare var $: any;


@Component({
  selector: 'app-shopping-complate-dialog',
  templateUrl: './shopping-complate-dialog.component.html',
  styleUrls: ['./shopping-complate-dialog.component.scss']
})
export class ShoppingComplateDialogComponent extends BaseDialog<ShoppingComplateDialogComponent> implements OnDestroy {

  constructor(dialogRef: MatDialogRef<ShoppingComplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingCompleteState) {
    super(dialogRef)
  }

  show: boolean = false;
  complete() {
    this.show = true;
  }

  ngOnDestroy(): void {
    if (!this.show)
      $("#basketModal").modal("show");
  }
}

export enum ShoppingCompleteState {
  Yes,
  No
}