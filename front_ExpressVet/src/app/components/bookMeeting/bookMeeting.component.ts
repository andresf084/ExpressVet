import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { getLocaleTimeFormat } from '@angular/common';
import { ConfigService } from 'src/app/services/config.services';
import { MeetingsService } from 'src/app/services/meetings.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-bookMeeting',
  templateUrl: './bookMeeting.component.html',
  styleUrls: ['./bookMeeting.component.css'],

})
export class BookMeetingComponent implements OnInit {

  minute60Miliseconds = 1000*60*60
  minDate = new Date()

  public initTime: any
  public endTime: any
  public meetingsMaster: any[] = []
  public usersList: any[] = []
  public animals: any[] = ["anfibio", "ave", "conejo", "gato", "minipig", "perro", "pez", "roedor", "reptil"]
  public form: FormGroup
  public startDateTime: AbstractControl
  public endDateTime: AbstractControl
  public petName: AbstractControl
  public petKind: AbstractControl
  public petOwner: AbstractControl
  public caseDescription: AbstractControl
  public veterinaryName: AbstractControl
  public IdMeeting: AbstractControl
  public statusName: AbstractControl
  public statusComment: AbstractControl

  constructor(
    public config: ConfigService,
    private meetingsService: MeetingsService,
    public usersService: UsersService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      startDateTime: [''],
      endDateTime: ['',],
      petName: [''],
      petKind: ['', Validators.required],
      petOwner: [''],
      caseDescription: [''],
      veterinaryName: [''],
      IdMeeting: [''],
      statusName: [''],
      statusComment: ['']
    })
    this.startDateTime = this.form.controls['startDateTime']
    this.endDateTime = this.form.controls['endDateTime']
    this.petName = this.form.controls['petName']
    this.petKind = this.form.controls['petKind']
    this.petOwner = this.form.controls['petOwner']
    this.caseDescription = this.form.controls['caseDescription']
    this.veterinaryName = this.form.controls['veterinaryName']
    this.IdMeeting = this.form.controls['IdMeeting']
    this.statusName = this.form.controls['statusName']
    this.statusComment = this.form.controls['statusComment']
  }


  ngOnInit() {
    this.listUsers();
    this.listMeetings();
  }

  createMeeting() {
    const startTime = Date.parse((<HTMLInputElement>document.getElementById('startDateTime')).value) ;
    const endTime = startTime + 3540000;
    const reserveData = {
      startDateTime: startTime,
      endDateTime: endTime,
    };
    this.meetingsService.searchReserves(reserveData).subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          alert('Este espacio ya se encuentra reservado')
        } else {
          this.addMeeting()
          this.form.reset()
        }
      },
      complete: () => {console.log('Validation reserve success')},
      error: () => {console.log('Validation reserve error')}
    })
  }

  addMeeting() {
    const data = this.form.value
    const dataTime = Date.parse((<HTMLInputElement>document.getElementById('startDateTime')).value) ;
    const addTime = dataTime + 3540000
    const startTime = new Date(dataTime)
    const endTime = new Date(addTime)

    const formData = {
      startDateTime: startTime,
      endDateTime: endTime,
      petName: data.petName,
      petKind: data.petKind,
      petOwner: data.petOwner,
      caseDescription: data.caseDescription,
      veterinaryName: data.veterinaryName
    }

    this.meetingsService.createMeetings(formData).subscribe({
      next: (res: any) => {
        console.log(formData)
        console.log(res);
      },
      complete: () => {console.log('Success create meeting')},
      error: () => {console.log('Error create meeting')}
    })
  }

  listUsers() {
    this.usersService.listUsers().subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.usersList = res;
        } else {
          console.log('Lista de usuarios vacía')
        }
      },
      complete: () => { console.log('success users list') },
      error: () => { console.log('error users list') }
    })
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

  cancelReserve() {
    //console.log(this.meetingsMaster)
    const cancelData = {
      IdMeeting: (<HTMLInputElement>document.getElementById('IdMeeting')).value,
      statusName: "cancelada",
      statusComment: (<HTMLInputElement>document.getElementById('statusComment')).value
    }
    for (let i=0; i < this.meetingsMaster.length; i++) {
      if (this.meetingsMaster[i].IdMeeting == cancelData.IdMeeting && this.meetingsMaster[i].statusName == "reservada") {
        this.meetingsService.cancelMeetings(cancelData).subscribe({
          next: (res: any) => {
          console.log(res)
          },
          complete: () => { console.log('Cancel success') },
          error: () => { console.log('Cancel error') }
        })
      } else {
        this.form.reset
        //alert('Código de cita no existe, por favor verificar')
      }
    }
  }
}
