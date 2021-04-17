import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';

const materialComponent = [
  MatButtonModule,
  MatButtonToggleModule,
  MatTableModule
];

@NgModule({
  declarations: [],
  imports: [materialComponent],
  exports: [materialComponent]
})
export class MaterialModule { }
