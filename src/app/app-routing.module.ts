import { NgModule, input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { InputComponent } from './components/input/input.component';

const routes: Routes = [
  { path: 'input', component: InputComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
