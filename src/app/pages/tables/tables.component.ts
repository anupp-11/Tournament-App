import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TeamFormComponent } from 'src/app/components/team-form/team-form.component';
import { TeamModel } from 'src/app/models/team.model';
import { TeamsService } from 'src/app/services/teams.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  imgUrl : string;
  isProcessing : boolean = false;
  constructor(private dialog:MatDialog,public teamService :TeamsService,private domSanitizer: DomSanitizer) { }

  dataSource: MatTableDataSource<TeamModel>;
  displayedColumns: string[] = ['logo', 'fullName', 'shortName','players','button'];
  teamList : TeamModel[];

  ngOnInit() {
    this.displayTable();
  }

  async displayTable(){
    this.isProcessing = true;
    this.teamList = await this.teamService.getAll();
    this.isProcessing = false;
    this.dataSource = new MatTableDataSource(this.teamList);
    console.log("Team List:",this.teamList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
          this.displayTable();
        }
      });
  
  }

  async deleteTeam(id:string){
    const response = await this.teamService.deleteTeam(id);
    this.displayTable();
    console.log(response);
    console.log("Id of team to be deleted:",id);

  }
  editTeam(team){
    console.log("Id of team to be edited:",team.id);
    this.teamService.populateForm(team);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(TeamFormComponent, dialogConfig).afterClosed()
    .subscribe((data) => {
      if (data) {
        //this.ve
      } else {
        this.displayTable();
      }
    });
  }

  

}
