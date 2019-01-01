import { NgModule } from '@angular/core';



import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [

  //MAIN
 //{ path: '', component: AppComponent },
//   { path: 'auth', component: LoginComponent },

//   { path: 'main', redirectTo: 'main/dash', pathMatch: 'full' },


  {
    path: '',
    loadChildren: () => import('./@module/loan/loan.module').then(m => m.LoanModule),


  },

  //CONSULT

  // {path: '', redirectTo: 'consult', pathMatch: 'full' },
  // { path: 'consult', redirectTo: 'consult/home', pathMatch: 'full' },


  // {
  //   path: 'consult',
  //   loadChildren: () => import('./@module/consult/consult.module').then(m => m.ConsultModule),
  //   //canActivate:[AuthGuard]
 

  // },
  
//ADMIN
//   {
//     path: 'admin',
//     loadChildren: () => import('./@module/admin/admin.module').then(m => m.AdminModule)
//   },
// //{path: '', redirectTo: 'admin', pathMatch: 'full' },

//HOSP


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }