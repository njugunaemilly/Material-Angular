import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { SliderComponent } from './components/slider/slider.component';
import { TableComponent } from './components/table/table.component';
import { FormdesignComponent } from './components/formdesign/formdesign.component';
import { AssociatesComponent } from './components/associates/associates.component';

const routes: Routes = [
  // {path: '', component: MenubarComponent},
  {path:'', component: HomeComponent}, 
  {path: 'card', component: CardComponent},
  {path: 'slider', component: SliderComponent},
  {path: 'table', component: TableComponent},
  {path: 'forms', component: FormdesignComponent},
  {path: 'associates/', component: AssociatesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
