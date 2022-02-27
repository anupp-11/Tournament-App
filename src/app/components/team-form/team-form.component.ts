import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxImageCompressService } from 'ngx-image-compress';
import { TeamModel } from 'src/app/models/team.model';
import { NotificationService } from 'src/app/services/notification.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: "app-team-form",
  templateUrl: "./team-form.component.html",
  styleUrls: ["./team-form.component.scss"],
})
export class TeamFormComponent implements OnInit {
  team: any = {};
  teamLogo: string
  teams: any;


  file: any;
  localUrl: any;
  localCompressedURl: any;
  sizeOfOriginalImage: number;
  sizeOFCompressedImage: number;


  constructor(
    public dialogRef: MatDialogRef<TeamFormComponent>,
    public service: TeamsService,
    public notificationService: NotificationService,
    private imageCompress: NgxImageCompressService
  ) {
    this.teamLogo = "";
    debugger;
    this.teams = [];
  }

  ngOnInit() {
    this.service.teamForm;
    debugger;
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.teamLogo = imgBase64Path;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    
  }

  // fileChangeEvent(fileInput: any) {
  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const image = new Image();
        
  //       this.file =  e.target.result;
  //       let fileName = fileInput.target.files[0].name;
  //       image.src = this.compressFile(this.file, fileName)
  //       image.onload = rs => {
  //         const imgBase64Path = e.target.result;
  //         this.teamLogo = imgBase64Path;
  //       };

  //     };

  //     reader.readAsDataURL(fileInput.target.files[0]);
  //   }
  // }
  // imgResultBeforeCompress: string;
  // imgResultAfterCompress: string;
  // compressFile(image, fileName):any {
  //   var orientation = -1;
  //   this.sizeOfOriginalImage = this.imageCompress.byteCount(image) / (1024 * 1024);
  //   console.log('Size in bytes is now:', this.sizeOfOriginalImage,fileName);
    
  //   this.imageCompress.compressFile(image, orientation, 50, 50).then(
  //     result => {
  //       this.imgResultAfterCompress = result;
  //       this.localCompressedURl = result;
  //       this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
  //       console.log('Size in bytes after compression:', this.sizeOFCompressedImage);
  //       // create file from byte
  //       const imageName = fileName;
  //       // call method that creates a blob from dataUri
  //       const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);
  //       //imageFile created below is the new compressed file which can be send to API in form data
  //       const imageFile = new File([result], imageName, { type: 'image/jpeg' });
  //       console.log(imageFile)
  //       return imageFile;
  //     });
    
  // }
  // dataURItoBlob(dataURI) {
  //   const byteString = window.atob(dataURI);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([int8Array], { type: 'image/jpeg' });
  //   return blob;
  // }



  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {


    this.team = Object.assign(this.team, this.service.teamForm.value);
    this.team.teamLogo = this.teamLogo;
    debugger;
    if (!this.service.teamForm.get('id').value) {

      this.addTeam(this.team);
      this.notificationService.success('Team Added Successfully');
      console.log("Add Vitra");
    } else {
      console.log("Inside update");
      this.editTeam(this.team);
      this.notificationService.success('Team Updated Successfully');
    }
    
    //this.displayBuyers();
  }

  addSkillButtonClick(): void {
    (<FormArray>this.service.teamForm.get('players')).push(this.service.addPlayerFormGroup());
  }

  async editTeam(team: TeamModel) {
    const response = await this.service.editTeam(this.service.teamForm.get('id').value, team);
    console.log("Edit Team Response", response);
    this.onClose();
  }

  async addTeam(team: TeamModel) {
    const response = await this.service.addTeam(team);
    console.log("Add Team Response", response);
    this.onClose();
  }
}
