import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YService } from '../y.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private serviceConnextion: YService) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]] // Ajout du champ de téléphone
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Logic for form submission
      this.serviceConnextion.connextion(this.myForm.value.name, this.myForm.value.email, this.myForm.value.password, this.myForm.value.phone)
      console.log(this.myForm.value.email);
    }

  }
}
