import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndComponent } from './components/end/end.component';
import { ErrorComponent } from './components/error/error.component';
import { GameOptionComponent } from './components/game-option/game-option.component';
import { GameComponent } from './components/game/game.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthenticationService } from './authentication.service';



// const routes: Routes = [
//   {path: '', component: LoginComponent},
//   {path: 'main', component: MainComponent, },
//   { path: 'error', component: ErrorComponent },
//   { path: 'signup', component: SignupComponent },
//   {path: 'option', component: GameOptionComponent, },
//   {path: 'game/:category', component: GameComponent, },
//   {path: 'end', component: EndComponent, },
//   {path: '**', redirectTo: '/', pathMatch: 'full'}
// ];
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthenticationService] },
  { path: 'error', component: ErrorComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'option', component: GameOptionComponent, canActivate: [AuthenticationService] },
  { path: 'game/:category', component: GameComponent, canActivate: [AuthenticationService] },
  { path: 'end', component: EndComponent, canActivate: [AuthenticationService] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
