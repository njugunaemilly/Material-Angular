import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';

const routes: Routes = [
  // {path: '', component: MenubarComponent},
  {path:'', component: HomeComponent}, 
  {path: 'card', component: CardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
