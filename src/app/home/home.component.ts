import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

import { BackendApiService } from '../services/backend-api.service';
import { GamePlayer } from '../model/GamePlayer';
import { GameLoginRequest } from '../model/GameLoginRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public loggedInPlayerId : string;
  public passwordField    : string;
  public userNameField    : string;
  public firstNameField   : string;
  public lastNameField    : string;
  public userEmailField   : string;
  public welcomeMessage   : string;
  public userRegistering  : boolean
  
  public loading          : boolean;
  public waiting          : boolean;

  @ViewChild('alert', { static: true }) alert: ElementRef;
  


  constructor(private backendsvc : BackendApiService ) 
  {
    this.passwordField = ""; 
  }

  ngOnInit() {
    this.welcomeMessage = "Welcome to MyUno Game! Right then, let's get started!";
    this.loading = false;
    this.waiting = false;
  }

  gotoregister_clicked() {
    this.userRegistering = true;
  }

  gotologin_clicked() {
    this.userRegistering = false;
  }

  login_clicked() {
    console.log("login_cilcked() ---> passwordField=" + this.passwordField);
    
    // log user in
    this.loading = true;    

    var x = new GameLoginRequest();
    x.GamePlayerId = this.userNameField;
    x.Password = this.passwordField;

    this.backendsvc.LoginRequest(x).subscribe( data => {
      this.backendsvc.LoggedInPlayerId = data.email;
      this.backendsvc.LoggedInPlayerEmail = data.email;
      this.backendsvc.LoggedInPlayerFirstName = data.FirstName;
      this.backendsvc.LoggedInPlayerLastName = data.LastName;
      this.backendsvc.LoggedInPlayerUserName = data.name;
      this.backendsvc.LoggedInPlayerGender = data.Gender;
      this.backendsvc.IsAuthenticated = true;     
      this.backendsvc.PlayerLoggedIn = true;
      this.welcomeMessage = `Welcome ${this.userNameField}!`;
      this.loading = false;
      console.log("login successful");
    })        
  }

  register_clicked() {
    console.log("register_clicked");
    this.loading = true;

    // get player user fields
    var registerPlayer = new GamePlayer();
    registerPlayer.FirstName = this.firstNameField;
    registerPlayer.LastName = this.lastNameField;
    registerPlayer.email = this.userEmailField;
    registerPlayer.Password = this.passwordField;
    console.log( 'creating Player: ' + JSON.stringify(registerPlayer));

    // create player
    this.backendsvc.createPlayer(registerPlayer).subscribe( data => {
      console.log('Got response ' + JSON.stringify(data));
      this.backendsvc.LoggedInPlayerId = data.GamePlayerId;
      this.backendsvc.LoggedInPlayerName = registerPlayer.FirstName;
      this.backendsvc.PlayerLoggedIn = true;
      this.loading = false;
      console.log("Player Created...");
    });    
  }

  get loggedIn(): boolean {
    return this.backendsvc.PlayerLoggedIn;
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  startGame_click() {
    this.waiting = true;
  }
}
