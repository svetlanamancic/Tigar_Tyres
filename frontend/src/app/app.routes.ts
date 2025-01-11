import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProductionComponent } from './production/production.component';
import { SalesComponent } from './sales/sales.component';
import { TyresComponent } from './tyres/tyres.component';
import { MachinesComponent } from './machines/machines.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

export const routes: Routes = [
    { path: '', redirectTo:'/login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { 
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'users', component: UsersComponent, data: { role: 'Admin' } },
            { path: 'machines', component: MachinesComponent, data: { role: 'Admin' }},
            { path: 'tyres', component: TyresComponent, data: { role: 'Admin' }},
            { path: 'production', component: ProductionComponent, data: { role: ['Admin', 'Production Operator', 'Quality Supervisor', 'Business Unit Leader'] }},
            { path: 'sales', component: SalesComponent, data: { role: ['Admin', 'Quality Supervisor', 'Business Unit Leader'] }}
        ]
    },
    {path:'errors', component: TestErrorsComponent},
    {path:'not-found', component: NotFoundComponent},
    {path:'server-error', component: ServerErrorComponent},
    { path: '**', redirectTo: '/login'} 
    //add error, not found and server error components

];
