import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

const materialComponent = [
  MatButtonModule,
  MatButtonToggleModule,
  MatTableModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatNativeDateModule,
  MatSelectModule,
  MatRadioModule,
  MatGridListModule,
  MatDialogModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: [materialComponent],
  exports: [materialComponent]
})
export class MaterialModule { }
