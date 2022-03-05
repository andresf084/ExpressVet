import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/services/config.services';
import { MeetingsService } from 'src/app/services/meetings.service';

@Component({
  selector: 'app-meetingInfo',
  templateUrl: './meetingInfo.component.html',
  styleUrls: ['./meetingInfo.component.css']
})
export class MeetingInfoComponent implements OnInit {

  public isReserved: any
  public isActive: any
  public updateData: any

  constructor(
    public config: ConfigService,
    private meetingsService: MeetingsService,
    @Inject(MAT_DIALOG_DATA) public data:
            {
              _id: string,
              IdMeeting: string,
              created_at: Date,
              startDateTime: Date,
              endDateTime: Date,
              petName: string,
              petKind: string,
              petOwner: string,
              caseDescription: string,
              veterinaryName: string,
              statusName: string,
              statusComment: string,
              statusDate: string
            },
            public matDialogref: MatDialogRef<MeetingInfoComponent>
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.matDialogref.close(this.data);
  }

  closeModalView(){
    this.matDialogref.close();
  }

  meetingStatusReserved() {
    this.data.statusName == "reservada"? this.isReserved = true: this.isReserved = false;
    return this.isReserved
  }

  meetingStatusActive() {
    this.data.statusName == "activa"? this.isActive = true: this.isActive = false;
    return this.isActive
  }

  activeMeeting(item: any) {
    console.log(item.statusName)
    console.log(item._id)
    const statusComment = (<HTMLInputElement>document.getElementById('statusComment')).value;
    console.log(statusComment)
    if (statusComment == "") {
      alert('El campo de comentarios no puede estar vacío')
    } else {
      this.meetingsService.updateMeetings({
        _id: item._id,
        statusName: "activa",
        statusComment: statusComment
      }).subscribe({
        next: (res: any) => {
          if(res.status) {}
        },
        complete: () => { this.closeModalView(), console.log('estado activa actualizado') }, // completeHandler
        error: () => { console.log('Error actualizando estado activa') }    // errorHandler
      })
    }
  }

  completeMeeting(item: any) {
    console.log(item.statusName)
    console.log(item._id)
    const statusComment = (<HTMLInputElement>document.getElementById('statusComment')).value;
    console.log(statusComment)
    if (statusComment == "") {
      alert('El campo de comentarios no puede estar vacío')
    } else {
      this.meetingsService.updateMeetings({
        _id: item._id,
        statusName: "completada",
        statusComment: statusComment
      }).subscribe({
        next: (res: any) => {
          if(res.status) {}
        },
        complete: () => { this.closeModalView(), console.log('estado completada actualizado') }, // completeHandler
        error: () => { console.log('Error actualizando estado completada') }    // errorHandler
      })
    }
  }

}
