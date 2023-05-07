import {NgModule} from '@angular/core';
import {CostPipe} from '../pipes/cost/cost.pipe';

@NgModule({
  declarations: [
    CostPipe
  ],
  exports: [
    CostPipe
  ]
})
export class SharedModule {}
