import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YService } from '../y.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrl: './preference.component.css'
})
export class PreferenceComponent implements OnInit{
  preferencesForm: FormGroup;

  constructor(public fb: FormBuilder,public serviceConnextion:YService) {
    this.preferencesForm = this.fb.group({
      earlySchedule: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      lateSchedule: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      freeDays: [0, [Validators.required, Validators.min(0), Validators.max(7)]],
      workHours: [3, [Validators.required, Validators.min(3), Validators.max(15), Validators.pattern('^([3,6,9,12,15])$')]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let currentUSer=localStorage.getItem('userData');
  

    
     
      let name=currentUSer!;
      
      if (this.preferencesForm.valid) {
      console.log("paul", this.preferencesForm.value);
      this.serviceConnextion.adddata(name,this.preferencesForm.value.earlySchedule,this.preferencesForm.value.lateSchedule,this.preferencesForm.value.freeDays,this.preferencesForm.value.workHours);
      // Envoyer les valeurs au backend ici
      }
      else(
        console.log("Form not valid")
      )
    } 
  

}
