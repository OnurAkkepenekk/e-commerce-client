import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDinamicLoadComponent]'
})
export class DinamicLoadComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
    
   }

}
