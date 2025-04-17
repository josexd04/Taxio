import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
//components

import { SinginComponent } from './components/singin/singin.component';
import { SingupComponent } from './components/singup/singup.component';
import { TaxisComponent } from './components/taxis/taxis.component';
import { TaxiInfoComponent } from './components/taxis/taxi-info/taxi-info.component';
import { RegisterDriverComponent } from './components/register-driver/register-driver.component';
import { ActiveDriverComponent } from './components/active-driver/active-driver.component';
import { FoliosComponent } from './components/folios/folios.component';



export const routes: Routes = [

  
    { path: "singin", component: SinginComponent },
    { path: "singup", component: SingupComponent, canActivate: [authGuard] },
    { path: "taxis", component: TaxisComponent, canActivate: [authGuard] },
    { path: "", redirectTo: "/taxis", pathMatch: 'full' },
    { path: "taxi-info/:_id", component: TaxiInfoComponent, canActivate: [authGuard] },
    { path: "register-driver", component: RegisterDriverComponent, canActivate: [authGuard] },
    { path: "active-driver", component: ActiveDriverComponent, canActivate: [authGuard] },
    { path: "folios", component:FoliosComponent, canActivate: [authGuard]}
];