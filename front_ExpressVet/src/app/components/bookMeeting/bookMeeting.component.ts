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

  public initTime: any
  public endTime: any
  public meetingsMaster: any[] = []
  public animals: any[] = ["anfibio", "ave", "conejo", "gato", "minipig", "perro", "pez", "roedor", "reptil"]
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
    public config: ConfigService,
    private meetingsService: MeetingsService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      IdMeeting: [''],
      created_at: [''],
      startDateTime: [''],
      endDateTime: [''],
      petName: [''],
      petKind: ['', Validators.required],
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
  }

  transformTime() {
    this.initTime = Date.parse((<HTMLInputElement>document.getElementById('dateTime')).value) ;
    this.endTime = this.initTime + 3540000
    console.log(this.initTime)
    console.log(this.endTime)
    const date = new Date(this.endTime);
    console.log("Fecha final: "+
    date.getDate()+
    "/"+(date.getMonth()+1)+
    "/"+date.getFullYear()+
    " "+date.getHours()+
    ":"+date.getMinutes()+
    ":"+date.getSeconds()
    )
  }



}
