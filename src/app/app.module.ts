import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from "./material/material.module";
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {MatDialogModule} from '@angular/material/dialog';
import { TeamsService } from './services/teams.service';
import { GroupsService } from './services/groups.service';
import { PlayComponent } from './pages/play/play.component';
import { InGameComponent } from './in-game/in-game.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { AlertService } from './alert-message/alert.service';
import { NotifierService } from './services/notifier.service';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PlayComponent,
    InGameComponent,
    AlertMessageComponent,
    
  ],
  providers: [TeamsService,GroupsService,AlertService,NotifierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
