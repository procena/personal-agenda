import { Routes, CanActivate } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { LoginComponent } from "./login/login.component";
import {
    AuthGuardService as AuthGuard
} from './auth/auth-guard.service';

import {
    RoleGuardService as RoleGuard
} from './auth/role-guard.service';
import { CalendarioComponent } from './calendario/calendario.component';
import { MenuComponent } from './menu/menu.component';
export const ROUTES: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'agenda/calendario',
        component: CalendarioComponent,
        canActivate: [AuthGuard],
        data: {
            expectedRole: 'operador'
        }
    }, 
    {
        path: 'menu',
        component: MenuComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'agenda',
        component: AgendaComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    },
    { path: '**', redirectTo: '' }
];