import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameRequest } from '../model/game-request';
import { BackendApiService } from '../services/backend-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  newGameForm:FormGroup;
  newGameName:FormControl;
  newGameDesc:FormControl;
  newGamePlayerCount:FormControl;
  newGamePlayerName:FormControl;
  //newGamePlayerEmail:FormControl;
  posts$: GameRequest;
  newGameReq: GameRequest;
  public waiting: boolean;

  constructor(
    private api: BackendApiService,
    private nav: Router ) 
  { }

  ngOnInit() {
    console.log('in ngOnInit');
    this.waiting = false;
    this.newGameName = new FormControl( '', Validators.required );
    this.newGameDesc = new FormControl( );    
    this.newGamePlayerCount = new FormControl( '', Validators.required );
    this.newGamePlayerName = new FormControl( '', Validators.required );
    //this.newGamePlayerEmail = new FormControl( '', Validators.required );

    this.newGameForm = new FormGroup({
      newGameName: this.newGameName,
      newGameDesc: this.newGameDesc,
      newGamePlayerCount: this.newGamePlayerCount,
      newGamePlayerName: this.newGamePlayerName//,
      //newGamePlayerEmail: this.newGamePlayerEmail
    })
    console.log('completed ngOnInit');
  }

  ngAfterViewInit() {
    this.newGamePlayerName.setValue( this.api.LoggedInPlayerName );
  }
  
  validateGameName(){
    return this.newGameName.invalid && this.newGameName.touched;
  }

  validatePlayerCount(){
    return this.newGamePlayerCount.invalid && this.newGamePlayerCount.touched;
  }

  validatePlayerName(){
    return this.newGamePlayerName.invalid && this.newGamePlayerName.touched;
  }

  // validatePlayerEmail(){
  //   return this.newGamePlayerEmail.invalid && this.newGamePlayerEmail.touched;
  // }
  
  createGame(x:any) {
    this.newGameReq = new GameRequest();
    this.newGameReq.GameName = this.newGameName.value;
    this.newGameReq.GameDescription = this.newGameDesc.value;
    this.newGameReq.PlayerCount = this.newGamePlayerCount.value;
    this.newGameReq.PlayerName = this.newGamePlayerName.value;
    //this.newGameReq.PlayerEmail = this.newGamePlayerEmail.value;
    this.newGameReq.PlayerId = this.api.LoggedInPlayerId;
    console.log('creating game for: ' + JSON.stringify(this.newGameReq));

    this.api.createGame(this.newGameReq).subscribe(
      api => {
        this.posts$ = api;
        console.log('Got Response: ' + JSON.stringify(this.posts$));
        this.api.ActiveGameId = this.posts$.GameId;
        this.api.ActiveGameName = this.newGameReq.GameName;
        this.api.ExpectedPlayerCount = this.newGameReq.PlayerCount;
        this.api.IsGameOwner = true;
        this.api.PlayerIndex = 0;
        this.nav.navigate(['/allplayers']);
      }      
    );

    this.waiting = true;
  }

  cancelNewGame(){
    console.log("Cancelled");
  }

  clearNewGame(){
    this.newGameName.setValue('');
    this.newGameName.markAsUntouched();
    this.newGameDesc.setValue('');
    this.newGameDesc.markAsUntouched();
    this.newGamePlayerCount.setValue('');
    this.newGamePlayerCount.markAsUntouched();
    this.newGamePlayerName.setValue(''); 
    this.newGamePlayerName.markAsUntouched();   
    // this.newGamePlayerEmail.setValue('');
    // this.newGamePlayerEmail.markAsUntouched();
  }
}
