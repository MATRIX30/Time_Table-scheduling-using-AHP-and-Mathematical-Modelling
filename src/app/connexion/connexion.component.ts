import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { YService } from '../y.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private login: YService ) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] // Ajout du champ de mot de passe
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      // Logic for form submission
      this.login.connextion1( this.myForm.value.email, this.myForm.value.password)
      console.log(this.myForm.value.email);
    }
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
      loadingSpinner.style.display = 'flex';
    }

    // Simulez un délai pour le chargement (par exemple, 2 secondes)
    setTimeout(() => {
      if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
      }
      alert('Connexion réussie !'); // Remplacez cette ligne par la logique réelle de connexion
    }, 2000);

  }
    
  
  }


