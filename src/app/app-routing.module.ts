import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AllPlayersComponent } from './all-players/all-players.component';
import { PlayerComponent } from './player/player.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { GamePlayComponent } from './game-play/game-play.component';
// import { LoginComponentComponent } from './login-component/login-component.component';
// import { MyCanNavigateGuard } from './my-can-navigate.guard';
// import { LogoutComponent } from './logout/logout.component';

 
const routes: Routes = [
  { path: '', component: HomeComponent, }, //, canActivate: [MyCanNavigateGuard]
  { path: 'myprofile', component: MyProfileComponent }, //, canActivate: [MyCanNavigateGuard]
  { path: 'myfriends', component: MyFriendsComponent },
  { path: 'allplayers', component: AllPlayersComponent},
  { path: 'players/:GamePlayerId', component: PlayerComponent },
  { path: 'creategame', component: CreateGameComponent },
  { path: 'joingame', component: JoinGameComponent },
  { path: 'gameplay', component: GamePlayComponent } //,
  // { path: 'login', component: LoginComponentComponent },
  // { path: 'logout', component: LogoutComponent },
  // { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
