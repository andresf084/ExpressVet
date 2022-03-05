import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.services';
import { AuthService } from 'src/app/services/auth.service';
import { MeetingsService } from 'src/app/services/meetings.service';
import { MatDialog } from '@angular/material/dialog';
import { MeetingInfoComponent } from '../meetingInfo/meetingInfo.component';


@Component({
  selector: 'app-manageMeetings',
  templateUrl: './manageMeetings.component.html',
  styleUrls: ['./manageMeetings.component.css']
})
export class ManageMeetingsComponent implements OnInit {

  public meetingsMaster: any[] = []
  public form: FormGroup
  public IdMeeting: AbstractControl
  public created_at: AbstractControl
  public startDateTime: AbstractControl
  public endDateTime: AbstractControl
  public petName: AbstractControl
  public petKind: AbstractControl
  public petOwner: AbstractControl
  public caseDescription: AbstractControl
  public veterinaryName: AbstractControl
  public statusName: AbstractControl
  public statusComment: AbstractControl
  public statusDate: AbstractControl

  constructor(
    public dialog: MatDialog,
    public config: ConfigService,
    private authService: AuthService,
    private meetingsService: MeetingsService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      IdMeeting: [''],
      created_at: [''],
      startDateTime: [''],
      endDateTime: [''],
      petName: [''],
      petKind: [''],
      petOwner: [''],
      caseDescription: [''],
      veterinaryName: [''],
      statusName: [''],
      statusComment: [''],
      statusDate: ['']
    })
    this.IdMeeting = this.form.controls['IdMeeting']
    this.created_at = this.form.controls['created_at']
    this.startDateTime = this.form.controls['startDateTime']
    this.endDateTime = this.form.controls['endDateTime']
    this.petName = this.form.controls['petName']
    this.petKind = this.form.controls['petKind']
    this.petOwner = this.form.controls['petOwner']
    this.caseDescription = this.form.controls['caseDescription']
    this.veterinaryName = this.form.controls['veterinaryName']
    this.statusName = this.form.controls['statusName']
    this.statusComment = this.form.controls['statusComment']
    this.statusDate = this.form.controls['statusDate']
  }

  ngOnInit() {
    this.listMeetings()
  }

  listMeetings() {
    this.meetingsService.listMeetings().subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.meetingsMaster = res
          //console.log(this.meetingsMaster)
        }
      },
      complete: () => {console.log('reservas listadas')},
      error: () => {console.log('Error al listar reservas')}
    })
  }

  qtyReserve() {
    this.meetingsService.qtyMeetingsReserve().subscribe({
      next: (res: any) => {},
      complete: () => {},
      error: () => {console.log('Error al contar reuniones reservadas')}
    })
  }

  qtyActive() {
    this.meetingsService.qtyMeetingsActive().subscribe({
      next: (res: any) => {},
      complete: () => {},
      error: () => {console.log('Error al contar reuniones activas')}
    })
  }

  qtyComplete() {
    this.meetingsService.qtyMeetingsComplete().subscribe({
      next: (res: any) => {},
      complete: () => {},
      error: () => {console.log('Error al contar reuniones activas')}
    })
  }

  viewMeetingInfo(item: any) {
    //console.log(item)
    if(item.statusName == "completada") {
      alert('La cita ya se ha completado, no puede cambiar su información')
    } else {
      let dialogRef = this.dialog.open(
        MeetingInfoComponent,
        {
          data: {
            _id: item._id,
            IdMeeting: item.IdMeeting,
            created_at: item.created_at,
            startDateTime: item.startDateTime,
            endDateTime: item.endDateTime,
            petName: item.petName,
            petKind: item.petKind,
            petOwner: item.petOwner,
            caseDescription: item.caseDescription,
            veterinaryName: item.veterinaryName,
            statusName: item.statusName,
            statusComment: item.statusComment,
            statusDate: item.statusDate
          },
          width: "800px",
          height: "700px",
          disableClose: true,
          restoreFocus: true
        }
        );
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.listMeetings();
        this.qtyReserve();
        this.qtyActive();
        this.qtyComplete();
      });
    }

  }

}
