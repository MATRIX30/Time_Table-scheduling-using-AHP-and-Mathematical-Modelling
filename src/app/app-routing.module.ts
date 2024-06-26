import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DahsbordComponent } from './dahsbord/dahsbord.component';
import { TimetableComponent } from './timetable/timetable.component';
import { PreferenceComponent } from './preference/preference.component';
import { VoirpreferenceComponent } from './voirpreference/voirpreference.component';

const routes: Routes = [
  {path: 'connextion', component: ConnexionComponent},
  {path: '', component: HomeComponent},
  {path: 'inscription', component: RegisterComponent},
  {path: 'dashboard', component: DahsbordComponent,
    children: [
      { path: 'Timetable', component: TimetableComponent},
      { path: 'Preference', component: PreferenceComponent},
      { path: 'Voirpreference', component: VoirpreferenceComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
