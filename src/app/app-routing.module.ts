import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  
  { path: 'login-page', loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule) },

  { path: 'products-page',
   loadChildren: () => import('./pages/products-page/products-page.module').then(m => m.ProductsPageModule),
   canActivate: [AuthGuard] },
  { path: 'register-page', loadChildren: () => import('./pages/register-page/register-page.module').then(m => m.RegisterPageModule) },

  { path: 'user-page',
   loadChildren: () => import('./pages/user-page/user-page.module').then(m => m.UserPageModule),
  canActivate: [AuthGuard] },
  { path: 'not-found',
   loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  {
    path:'',
    redirectTo:'login-page',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'/not-found'    
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
