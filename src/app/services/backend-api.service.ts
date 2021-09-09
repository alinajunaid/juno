import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GamePlayer } from '../model/GamePlayer';
import { GameRequest } from '../model/game-request';
import { GameInvitation } from '../model/GameInvitation';
import { JoinGameResponse } from '../model/JoinGameResponse'
import { GameStatusResponse } from '../model/gamestatus-response';
import { GameTurnResult } from '../model/game-turn-result';
import { GameTurn } from '../model/game-turn';

import { gameFriend } from '../model/gameFriend';
import { GameLoginRequest } from '../model/GameLoginRequest';
import { GameFriendRequest } from '../model/game-friendrequest';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  private devUrl = 'http://localhost:7071/api';
  private testUrl = 'https://junogameservice.azurewebsites.net/api';

  private baseUrl = 'https://junogameservice.azurewebsites.net/api';

  // *******State properties
  public LoggedInPlayerId       : string;
  public LoggedInPlayerName     : string;
  public LoggedInPlayerFirstName: string;
  public LoggedInPlayerLastName : string;
  public LoggedInPlayerEmail    : string;
  public LoggedInPlayerUserName : string;
  public LoggedInPlayerGender   : number;
  public ActiveGameId           : string;
  public ActiveGameName         : string;
  public PlayerIndex            : number;
  public ExpectedPlayerCount    : number;
  public GamePlayerCount        : number;
  public PlayerLoggedIn         = false;
  public IsGameOwner            = false;
  public IsAuthenticated        = false;
  // ***********************

  constructor(private http: HttpClient) {
    //this.baseUrl = this.devUrl;
    this.baseUrl = this.testUrl;
   }

   LoginRequest(creds: GameLoginRequest): Observable<GamePlayer> {
    return this.http.post<GamePlayer>(
        `${this.baseUrl}/TestJunoLogin?code=HXqkh9B92QoxyPpH97AW71eXF8qdHY0NCBz1QaG4WDwyMlN9Fc5MEw==`,
        creds
      );
  }

  SendaFriendRequest(req: GameFriendRequest){
    return this.http.post<GameFriendRequest>(
      `${this.baseUrl}/TestJunoCreateFriendRequest?code=HXqkh9B92QoxyPpH97AW71eXF8qdHY0NCBz1QaG4WDwyMlN9Fc5MEw==`,
        req
    );
  }

  getAllGames() {
    return this.http.get<any[]>(
      `${this.baseUrl}/TestGetAllGames?code=4sxNUXVADGuYQHMziODr59naW2ePG8flcreoaiyLx1MHLUVtvDfi0Q==`);
  }

  CallRun() {
    //this.http
    return this.http.get<any>(
      this.devUrl +
      '/TestJunoFnApi',
    );
  }
  
  getGame(id) {
    return this.http.get<any>(
      `${this.baseUrl}/TestGetAllGames?code=4sxNUXVADGuYQHMziODr59naW2ePG8flcreoaiyLx1MHLUVtvDfi0Q==&id=${id}`);
  }
  
  getFriends(player: GamePlayer): Observable<any> {
    console.log("requesting list of friends");
    return this.http.post<any>(
        `${this.baseUrl}/TestJunoGetAllPlayerFriends?code=HXqkh9B92QoxyPpH97AW71eXF8qdHY0NCBz1QaG4WDwyMlN9Fc5MEw==`,
        player
      );
  }

  getFriendRequests(player: GamePlayer): Observable<any> {
    console.log("requesting list of friend requests");
    return this.http.post<any>(
        `${this.baseUrl}/TestJunoGetAllFriendRequests?code=HXqkh9B92QoxyPpH97AW71eXF8qdHY0NCBz1QaG4WDwyMlN9Fc5MEw==`,
        player
      );
  }  

  AcceptFriendRequest(friendRq: GameFriendRequest): Observable<any> {
    console.log("submitting acceptance of selected received friend request.");
    return this.http.post<any>(
      `${this.baseUrl}/TestJunoAcceptFriendRequest?code=HXqkh9B92QoxyPpH97AW71eXF8qdHY0NCBz1QaG4WDwyMlN9Fc5MEw==`,
      friendRq
    );
  }

  DeclineFriendRequest(friendRq: GameFriendRequest): Observable<any> {
    console.log("submitting acceptance of selected received friend request.");
    return this.http.post<any>(
      `${this.baseUrl}/TestJunoDeclineFriendRequest?code=HXqkh9B92QoxyPpH97AW71eXF8qdHY0NCBz1QaG4WDwyMlN9Fc5MEw==`,
      friendRq
    );
  }

  getAllPlayers(): Observable<GamePlayer[]> {
    return this.http.get<any>(
      `${this.baseUrl}/TestJunoGetAllPlayers?code=Owo90SAyPXcIduem5iVMjaFwaqrhOEtcHSaKmtymE3fgZEFppUkn/Q==`);
  }

  getAllInvitations(forPlayerId : string): Observable<GameInvitation[]> {
    return this.http.get<any>(
      `${this.baseUrl}/TestJunoGetAllInvitations?code=vknPKXY3yP4TMzDqGAD23015MTl67MY3zxHVhxf764VIZ9fcnbmysA==&PlayerId=${forPlayerId}`);
  }

  getPlayer(id: string): Observable<GamePlayer> {
    return this.http.get<GamePlayer>(
      `${this.baseUrl}/TestJunoGetPlayer?code=0nj06NWNrnqc/gonlZj/FJBhgMJlPGo/bFPu1HJEXbWLfGAo1tc5Zw==&PlayerId=${id}`);    
  }

  joinGame(invitation: GameInvitation): Observable<JoinGameResponse> {
    return this.http.post<JoinGameResponse>(
      `${this.baseUrl}/TestJunoJoinGame?code=/Sa6ZUA4MhImdFxgSp4F0/IecQ4OUOOl66NmJQfONDjUiqX1sZIA4g==`,
      invitation
    );    
  }

  createPlayer(player: GamePlayer): Observable<GamePlayer> {
    return this.http.post<GamePlayer>(
      `${this.baseUrl}/TestJunoCreatePlayer?code=d17izWbXDkongHVOYn63Y3eJlCnSk1ke9RcJnawtebAmd0Qs5VQLng==`,
      player
    );
  }

  createGame(game: GameRequest): Observable<GameRequest> {
    return this.http.post<GameRequest>(
      `${this.baseUrl}/TestJunoCreateGame?code=9UD4ABQxwUM7OEzVYo2geacoyg83pzpMIn23D6ZCiLA15I2I94Bacg==`,
      game
    );
  }
  
  getGameStatus(statusRequest: JoinGameResponse): Observable<GameStatusResponse> {
    return this.http.post<GameStatusResponse>(
      `${this.baseUrl}/TestJunoGetGameStatus?code=vkhJedaWBkgZNC3L4zM3YJfl6zbWmhCntPauM27TMK2cOMuZK4gHaw==`,
      statusRequest
    );
  }

  invitePlayer(invitation: GameInvitation): Observable<GameInvitation> {
    return this.http.post<GameInvitation>(
      `${this.baseUrl}/TestJunoInvitePlayer?code=ppQ0vbTFIJM2c8Um8LU58NQxK8oc6wQnSkB6j1jSNz7TWw8e4TSklA==`,
      invitation
    );
  }

  playTurn(turnPlayed : GameTurn) : Observable<GameTurnResult> {
    return this.http.post<GameTurnResult>(
      `${this.baseUrl}/TestJunoPlayTurn?code=M23NC5Kf5ac9zrbi9yh6Qsktag0CrsBWv6U9CND1QBzOQoKvb7zD9w==`,
      turnPlayed
    )
  }
}
