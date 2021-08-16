import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { Router } from '@angular/router';
import { GameInvitation } from '../model/GameInvitation';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {
  public allInvitations = [];
  public loading = false;

  constructor(
      private api: BackendApiService,
      private nav: Router
    ) 
    { }

  ngOnInit() {
      console.log('getting all invitations for ' + this.api.LoggedInPlayerId);      
      this.loading = true;
      this.api.getAllInvitations(this.api.LoggedInPlayerId).subscribe( data=> {
        this.allInvitations = data;
        console.log('Completed player.component::ngOnInit')
        this.loading = false;
      })        
    }

    joinGame(theInvitationId : string) : void {
      this.loading=true;
      console.log('Joining invitationid: ' + theInvitationId);
      var theInvitation = new GameInvitation();
      theInvitation.InvitationId = theInvitationId;
      this.api.joinGame(theInvitation).subscribe( data=> {
        this.api.ActiveGameId = data.GameId;
        this.api.PlayerIndex = data.GamePlayerId;
        console.log('Joined successfully - player turn no. ' + data.GamePlayerId);
        this.loading =false;
        this.nav.navigate(['/gameplay']);
      })      
    }
}
