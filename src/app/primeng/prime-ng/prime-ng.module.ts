import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {CardModule} from 'primeng/card';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    CardModule,
    RippleModule,
    TableModule,
    ButtonModule 
  ]
})
export class PrimeNgModule { }
