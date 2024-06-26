import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class YService {

  constructor(private https: HttpClient, private route: Router) { }
  scheduleData:any=[];
  connextion( nom :string, email: string, password: string, tel:number){
    let administrateur = { 
    "nom":nom,
    "email":email,
    "password": password,
    "tel": tel
    }
    const header = new HttpHeaders({
      contentType:'application/json'
    })
    this.https.post('http://localhost:3000/admin/signup',administrateur,{headers:header}).subscribe(
      (data)=>{
        console.log(data);
        localStorage.setItem('userdata', JSON.stringify(data));
       this.route.navigate(['/connextion']);
        
      }
    )
    


  }

  connextion1( email: string, password: string){
    let administrateur = {
    "email":email,
    "password": password,
    }
    const header = new HttpHeaders({
      contentType:'application/json'
    })
    this.https.post('http://localhost:3000/admin/login',administrateur,{headers:header}).subscribe(
      (data)=>{
        console.log(data);
        localStorage.setItem('userdata', JSON.stringify(data));
       this.route.navigate(['/dashboard']);
        
      }
    )
  }
  
  adddata(name:string,courseOnmorning:number,courseOnEvening:number,havingDaoff:number,numberOfhours:number){
   let preferences={
  "name":name,
  "courseOnMorning":courseOnmorning,
  "courseOnEvening":courseOnEvening,
  "havingDayOff":havingDaoff,
  "preferredNumberOfHour":numberOfhours,
  "userId":JSON.parse(localStorage.getItem('userdata')!).user._id
   }
   console.log(preferences);
   const header = new HttpHeaders({
    contentType:'application/json'
  })
  this.https.post('http://localhost:3000/preferences/add/',preferences,{headers:header}).subscribe(
    (data)=>{
      console.log(data);
      window.alert("preferences saved");
      
    },
    error=>{
      console.log(error);
    }
  )



  }
  getprefereces(){
   const param=new HttpParams({

   }).set('userId',JSON.parse(localStorage.getItem('userdata')!).user._id)
    const header= new HttpHeaders({
       contectType:'application/json'
    })
    this.https.get('http://localhost:3000/preferences/allpreferences/'+JSON.parse(localStorage.getItem('userdata')!).user._id,{headers:header}).subscribe(
      (data)=>{
        console.log(data);
      this.scheduleData=data as any[];
      return this.scheduleData
      },
      err=>{
        console.log(err);
      }
      

    )
  }
}
