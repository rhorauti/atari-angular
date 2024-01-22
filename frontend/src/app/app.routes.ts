import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './pages/auth/new-password/new-password.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RedirectComponent } from './pages/auth/redirect/redirect.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
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
    path: '**',
    component: LoginComponent,
  },
];
