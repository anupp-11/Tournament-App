import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GroupModel } from 'src/app/models/groups.model';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  isProcessing: boolean = false;
  constructor(private dialog: MatDialog, public groupService: GroupsService) { }

  dataSource: MatTableDataSource<GroupModel>;
  displayedColumns: string[] = ['id', 'name', 'teamsSize', 'button'];
  groupList: GroupModel[];
  length: number = null;
  ngOnInit() {
    this.displayTable();
  }

  async displayTable() {
    try {
      this.isProcessing = true;
      this.groupList = await this.groupService.getAll();
      this.isProcessing = false;
      this.dataSource = new MatTableDataSource(this.groupList);
    } catch (error) {
      this.isProcessing = false;
      console.log(error);
    }
  }

  getLength(teams) {
    return teams.length;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteGroup(id: string) {
    const response = await this.groupService.deleteGroup(id);
    this.displayTable();
  }

}
