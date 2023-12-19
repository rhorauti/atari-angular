import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CustomersComponent } from './pages/customers/customers.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'customers',
        component: CustomersComponent,
    },
    {
        path: '**',
        component: LoginComponent,
    }
];
