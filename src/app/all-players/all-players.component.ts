import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { GameInvitation } from '../model/GameInvitation';
import { Router } from '@angular/router';
import { GamePlayer } from '../model/GamePlayer';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-all-players',
  templateUrl: './all-players.component.html',
  styleUrls: ['./all-players.component.css']
})
export class AllPlayersComponent implements OnInit {
  public allPlayers = [];
  public loading = false;
  private gameInvite : GameInvitation;
  private playersInvitedCount : number;

  constructor(
      private api: BackendApiService,
      private nav: Router
    ) { }

  ngOnInit() {
    this.loading = true;
    this.playersInvitedCount = 1;
    this.api.getAllPlayers().subscribe( data=> {
      this.allPlayers = data;
      this.loading = false;
    });
  }

  invitePlayer(playerToInvite : GamePlayer) {    
    this.gameInvite = new GameInvitation();
    this.gameInvite.GameId = this.api.ActiveGameId;
    this.gameInvite.PlayerId = playerToInvite.GamePlayerId;
    this.gameInvite.GameName = this.api.ActiveGameName;
    this.gameInvite.InviterName = this.api.LoggedInPlayerName;
    this.gameInvite.InviteeName = playerToInvite.FirstName;
    this.gameInvite.InvitationDate = Date(); 
    console.log('Prepared invite: ' + JSON.stringify(this.gameInvite));

    this.api.invitePlayer(this.gameInvite).subscribe( data => {
      console.log('Got response: ' + JSON.stringify(data));
      this.playersInvitedCount++;
      if( this.playersInvitedCount >= this.api.ExpectedPlayerCount ) {
        this.loading = true;
        this.nav.navigate(['/gameplay']);
      }
    });
  }
}
