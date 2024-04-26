import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/auth/new-password/new-password.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RedirectComponent } from './pages/auth/redirect/redirect.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { PurchasedProductsComponent } from './pages/purchased-products/purchased-products.component';
import { CompanyComponent } from './pages/company/company.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'new-password',
    component: NewPasswordComponent,
  },
  {
    path: 'redirect',
    component: RedirectComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
  },
  {
    path: 'suppliers',
    component: SuppliersComponent,
  },
  {
    path: 'company/:registerType',
    component: CompanyComponent,
  },
  {
    path: 'purchased-products',
    component: PurchasedProductsComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  },
];
