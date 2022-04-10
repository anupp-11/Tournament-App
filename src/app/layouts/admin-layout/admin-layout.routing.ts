import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { PlayComponent } from 'src/app/pages/play/play.component';
import { StartMatchComponent } from 'src/app/components/start-match/start-match.component';
import { InGameComponent } from 'src/app/in-game/in-game.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'play',           component: PlayComponent },
    { path: 'start/:id',      component: StartMatchComponent},
    { path: 'ingame/:id',      component: InGameComponent},
];


