import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { PlayComponent } from 'src/app/pages/play/play.component';
import { StartMatchComponent } from 'src/app/components/start-match/start-match.component';
import { InGameComponent } from 'src/app/in-game/in-game.component';
import { AuthGuard } from 'src/app/services/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent,canActivate: [AuthGuard] },
    { path: 'tables',         component: TablesComponent,canActivate: [AuthGuard]  },
    { path: 'icons',          component: IconsComponent,canActivate: [AuthGuard]  },
    { path: 'maps',           component: MapsComponent ,canActivate: [AuthGuard] },
    { path: 'play',           component: PlayComponent,canActivate: [AuthGuard]  },
    { path: 'start/:id',      component: StartMatchComponent,canActivate: [AuthGuard] },
    { path: 'ingame/:id',      component: InGameComponent,canActivate: [AuthGuard] },
];


