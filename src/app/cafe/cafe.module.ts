import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CafeListComponent } from './cafe-list/cafe-list.component';

@NgModule({
  declarations: [
    CafeListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CafeListComponent
  ]
})
export class CafeModule { }
