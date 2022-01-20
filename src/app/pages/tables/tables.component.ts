import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TeamFormComponent } from 'src/app/components/team-form/team-form.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }
  onAddTeamClick(){
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.maxHeight= '100vh';
    this.dialog.open(TeamFormComponent, dialogConfig)
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          //this.ve
        } else {
          //this.displayBuyers();
        }
      });
  
  }

}
