import { Component, OnInit } from '@angular/core';
import { YService } from '../y.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-voirpreference',
  templateUrl: './voirpreference.component.html',
  styleUrl: './voirpreference.component.css'
})
export class VoirpreferenceComponent implements OnInit {
  constructor(public serviceConnextion: YService,public https:HttpClient){}
  sheduleData:any[]=[];
  ngOnInit(): void {
   
this.getprefereces();
    throw new Error('Method not implemented.');
  }
 /* scheduleData = [
    { earlyCourse: '7:00 AM', lateCourse: '6:00 PM', freeDays: 2, workHours: 40 },
    { earlyCourse: '8:00 AM', lateCourse: '5:00 PM', freeDays: 1, workHours: 45 },
    { earlyCourse: '9:00 AM', lateCourse: '7:00 PM', freeDays: 3, workHours: 35 },
    { earlyCourse: '6:00 AM', lateCourse: '8:00 PM', freeDays: 2, workHours: 50 }
  ];*/


  getprefereces(){
    const param=new HttpParams({
 
    }).set('userId',JSON.parse(localStorage.getItem('userdata')!).user._id)
     const header= new HttpHeaders({
        contectType:'application/json'
     })
     this.https.get('http://localhost:3000/preferences/allpreferences/'+JSON.parse(localStorage.getItem('userdata')!).user._id,{headers:header}).subscribe(
       (data:any)=>{
         console.log(data.preferences);
       this.sheduleData=data.preferences as any[];
       return this.sheduleData
       },
       err=>{
         console.log(err);
       }
       
 
     )
   }
}
