import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { BackendApiService } from '../services/backend-api.service';
import { GameStatusResponse } from '../model/gamestatus-response';
import { JoinGameResponse } from '../model/JoinGameResponse';
import { GameTurn } from '../model/game-turn';
import { AnUnoCard } from '../model/AnUnoCard';


@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {
  public loading = false;
  public waitingForGame = true;
  public waitingForTurn = false;
  public itsOurTurn = false;
  public gameId: string;
  public gameStatus: GameStatusResponse;
  public cardPlayedField: number;
  public colorProposedField: number;
  public itsYourTurn = false;
  public currentCard: string;
  public currentColor: number;
  public currentPlayerCount: number;
  public expectedPlayerCount: number;
  public loggedInUser: string;
  public waiting: boolean;
  public nameOfTheGame: string;
  public showModal: boolean;
  public modalTitle: string;
  public modalMessage: string;
  //public enableRightButton: boolean;

  public msgList: AnUnoCard[];
  public SelectedCard: AnUnoCard;

  private dataList: AnUnoCard[];
  private currentFirstCard: number;
  private cardsSet: boolean;
  private abc: Subscription;


  constructor(
    private api: BackendApiService,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private nav: Router) { }


  ngOnInit() {
    console.log('gamePlay.component::ngOnInit started');

    // this.gameId = this.router.snapshot.paramMap.get('gameid');
    // console.log('got back this id: ' + this.gameId);

    // default color value - used when a card is selected by the player
    this.colorProposedField = -1;

    // name of the game
    this.nameOfTheGame = this.api.ActiveGameName;

    // This records the card that the user just selected
    this.SelectedCard = new AnUnoCard();
    this.SelectedCard.CardTitle = '<placeholder>';

    // this is used as a pointer to the start of our sliding view of the players hand of cards
    this.currentFirstCard = 0;

    // set the loggedin user
    this.loggedInUser = this.api.LoggedInPlayerName;

    // to begin with the slide hand to the right should be enabled
    //this.enableRightButton = true;

    // set the flag for the cards to be set up
    this.cardsSet = false;

    // initial value for player proposed color
    this.currentColor = -1;

    // setup a timer to execute a method to get status of game
    let source = timer(1000, 5000);
    this.abc = source.subscribe(val => {
      this.waiting = true;
      console.log(val, '-', 'status timer triggered');

      // set up the players hand of cards and update display
      this.GetGameStatus();

      // spinner between turns
      this.waiting = false;
    });


    console.log('Completed gamePlay.component::ngOnInit')
  }

  // ngAfterViewInit() {
  //   this.GetGameStatus();
  // }

  // indicate if this is the player who created the game
  get IsOwner(): boolean {
    return this.api.IsGameOwner;
  }

  // this sets up the players hand of cards and updates the sliding view over it
  setUpCards() {
    console.log(`Setting up total of ${this.gameStatus.Hand.Cards.length} cards`);
    this.dataList = new Array(this.gameStatus.Hand.Cards.length);

    // save the hand received back from the server
    for (var cc = 0; cc < this.dataList.length; cc++) {
      this.dataList[cc] = new AnUnoCard();
      this.dataList[cc].CardNumber = this.gameStatus.Hand.Cards[cc];
      this.dataList[cc].CardTitle = this.convertToCard(this.gameStatus.Hand.Cards[cc].toString());
      console.log(`Card# ${this.gameStatus.Hand.Cards[cc]} --->Deck card # ${cc.toString()} is : ${this.dataList[cc].CardTitle}`);
    }

    // populate the sliding view over the hand
    this.msgList = new Array(this.dataList.length > 3 ? 3 : this.dataList.length);
    this.msgList[0] = new AnUnoCard();
    this.msgList[0] = this.dataList[0];

    if (this.msgList.length > 1) {
      this.msgList[1] = new AnUnoCard();
      this.msgList[1] = this.dataList[1];
    }

    if (this.msgList.length > 2) {
      this.msgList[2] = new AnUnoCard();
      this.msgList[2] = this.dataList[2];
    }

    // reset the pointer and start the sliding view from the start
    this.currentFirstCard = 0;

    // set the flag to show the cards of the hand have now been set
    this.cardsSet = true;
  }



  // this captures the event the child component fires to tell us which card the user has selected
  onCardSelected(value: AnUnoCard): void {
    // turn on the waiting spinner
    this.waiting = true;

    // this records locally the card the player has selected to play
    this.SelectedCard = value;
    if (value.CardNumber) {
      this.cardPlayedField = value.CardNumber;
    }
    else {
      console.log('Invalid CardNumaber in onCardSelected');
      this.cardPlayedField = -2;
    }

    // similarly if a color needs to be recorded
    if (value.CardColor) {
      this.colorProposedField = value.CardColor;
    }
    else {
      this.colorProposedField = 0;
    }
    console.log('Card played reported to parent as: ' + this.cardPlayedField);
    console.log('Card details: ' + JSON.stringify(this.SelectedCard));

    // now send the card played info to the game server
    this.PlayTheTurn();
  }

  // this is to simulate the slider over hand of cards moving to the left
  OnLeft() {
    console.log('left: ' + this.currentFirstCard.toString());

    // we only move to the left if we are not already at the start
    if (this.currentFirstCard > 0) {
      console.log('Sliding hand to the left');
      this.currentFirstCard--;
      this.msgList[0] = this.dataList[this.currentFirstCard];
      this.msgList[1] = this.dataList[this.currentFirstCard + 1];
      this.msgList[2] = this.dataList[this.currentFirstCard + 2];

      // as we have moved let, sliding to the right should be enabled if its not
      //this.enableRightButton = true;
    }
    console.log('left: ' + this.currentFirstCard.toString());
  }

  // this simulates the hand slider moving to the right
  OnRight() {
    console.log('right: ' + this.currentFirstCard.toString());
    console.log(`right boundary: ${this.dataList.length} pulled back to ${this.dataList.length - 3}`);

    // only move far enough so we dont go past the end
    if (this.currentFirstCard < (this.dataList.length - 3)) {
      console.log('sliding hand to the right');
      this.currentFirstCard++;
      this.msgList[0] = this.dataList[this.currentFirstCard];
      this.msgList[1] = this.dataList[this.currentFirstCard + 1];
      this.msgList[2] = this.dataList[this.currentFirstCard + 2];

      // keepping the right button for the hand slider enabled
      //this.enableRightButton = true;
    }
    else {
      // disable the right button if we have reached end of hand
      //this.enableRightButton = false;
    }
    console.log('right: ' + this.currentFirstCard.toString());
    //console.log('enable right: ' + this.enableRightButton);
  }

  // decide whether the side hand towards right button needs to be enabled
  get disableRightButton() {
    return this.currentFirstCard >= (this.dataList.length - 3);
  }

  // get current game status from the server
  GetGameStatus() {
    // set up the request in parameter
    var joinGame = new JoinGameResponse();
    joinGame.GameId = this.api.ActiveGameId;
    joinGame.GamePlayerId = this.api.PlayerIndex;
    console.log('service game id: ' + this.api.ActiveGameId);
    console.log('joinGame playerid: ' + joinGame.GamePlayerId);

    // sending request
    console.log('Sending status request: ' + JSON.stringify(joinGame));
    this.api.getGameStatus(joinGame).subscribe(status => {
      // log and capture the resposne
      console.log('Got Status Response: ' + JSON.stringify(status));
      this.gameStatus = status;

      this.currentCard = this.gameStatus.CurrentCard.toString();
      console.log("currentCard: " + this.currentCard);

      this.currentColor = this.gameStatus.CurrentColor;
      console.log("currentCard: " + this.currentCard);

      this.currentPlayerCount = this.gameStatus.PlayerCount;
      console.log("currentPlayerCount" + this.currentPlayerCount);

      this.expectedPlayerCount = this.gameStatus.ExpectedCount;
      console.log("expectedPlayerCount" + this.expectedPlayerCount.toString());
      console.log("total players: " + this.gameStatus.GamePlayers.length.toString());
      console.log("currentPlayer" + this.gameStatus.CurrentPlayer.toString());

      switch (status.GameStatusId) {
        case 2:   // the game has started          
          this.waitingForGame = false;
          console.log('Game has started...');
          if (status.CurrentPlayer == this.api.PlayerIndex) {
            console.log('And its our turn!');
            this.waitingForTurn = false;
            this.itsYourTurn = true;
            if (!this.cardsSet) {
              this.setUpCards();
            }
          }
          else {
            console.log('we are waiting for our turn');
            this.waitingForTurn = true;
          }
          break;

        case 3:   // the game has ended
          this.abc.unsubscribe(); // turn off the timer
          this.waitingForGame = true;
          this.waitingForTurn = false;
          console.log('the game has ended');
          this.api.LoggedInPlayerId = null;
          this.api.ActiveGameId = null;
          this.api.ActiveGameName = null;
          this.api.LoggedInPlayerName = null;
          this.api.PlayerIndex = -1;
          this.api.ExpectedPlayerCount = 0;
          this.api.GamePlayerCount = 0;
          this.nav.navigate(['/']);
          break;

        default: // the game has not started
          console.log('we are waiting for the game to begin');
          this.waitingForGame = true;
          this.waitingForTurn = false;
      }
    });
  }

  // convert card number to card instance
  convertToCard(cardNoStr: string): string {
    var response = '';
    var cardNo = 0;

    if (cardNoStr){
      cardNo = parseInt(cardNoStr);
    }

    if (cardNo == 0) {
      response = 'no card played yet';
    }
    else if (cardNo < 14) {
      // blue cards
      response = 'blue ';
      if (cardNo > 9) {
        response += this.GetSpecialCard(cardNo);
      }
      else {
        response += cardNo.toString();
      }
    }
    else if (cardNo < 27) {
      // red cards
      response = 'red ';
      if ((cardNo - 13) > 9) {
        response += this.GetSpecialCard(cardNo - 13);
      }
      else {
        response += (cardNo - 13).toString();
      }
    }
    else if (cardNo < 40) {
      // yellow cards
      response = 'yellow ';
      if ((cardNo - 26) > 9) {
        response += this.GetSpecialCard(cardNo - 26);
      }
      else {
        response += (cardNo - 26).toString();
      }
    }
    else {
      // green cards
      response = 'green ';
      if ((cardNo - 39) > 9) {
        response = this.GetSpecialCard(cardNo - 39);
      }
      else {
        response += (cardNo - 39).toString();
      }
    }

    return response;
  }

  // to help detect special cards
  GetSpecialCard(cardNo: number): string {
    var response = '';
    switch (cardNo) {
      case 10:
        response = 'Switch';
        break;
      case 11:
        response = 'Skip';
        break;
      case 12:
        response = 'Plus 1';
        break;
      case 13:
        response = 'Plus 2';
        break;
      case 14:
      case 15:
      case 16:
      case 17:
        // 4+ card
        response = 'Plus 4';
        break;
      case 18:
      case 19:
        // change color
        response = 'Pick Color';
        break;
    }
    return response;
  }

  // to simulate drawing a card from the game deck
  DrawCard() {
    console.log('Player opted to draw a card from the game deck');
    this.cardPlayedField = -1;
    this.PlayTheTurn();
  }

  PlayTheTurn() {
    console.log('cardPlayed: ' + this.cardPlayedField);
    console.log('test field: ' + this.colorProposedField);
    var turnPlayed = new GameTurn();
    turnPlayed.GameId = this.api.ActiveGameId;
    turnPlayed.GamePlayerId = this.api.PlayerIndex;
    turnPlayed.CardPlayed = this.cardPlayedField;
    if (!this.colorProposedField) {
      this.colorProposedField = 0;
    }
    turnPlayed.ColorProposed = this.colorProposedField;
    console.log('Turn Played is: ' + JSON.stringify(turnPlayed));

    this.api.playTurn(turnPlayed).subscribe(data => {
      console.log('Got response: ' + JSON.stringify(data));

      // check if someone has won
      if (data.TurnResult > 0) {
        // turn off the getstatus timer
        this.abc.unsubscribe();

        // if the player has won, then end the game
        if (data.Winner == this.api.PlayerIndex) {
          console.log('You Won! Good Job');
          this.modalTitle = "Congratulations!!";
          this.modalMessage = "You Won! Good Job";
        }
        else {
          console.log('Game has ended - someone has won');
          this.modalTitle = "Game Over";
          this.modalMessage = this.gameStatus.GamePlayers[data.Winner].FirstName + "won the game";
        }

        console.log('Resetting the game flags as game has ended and going back to home');
        this.showModal = true;
      }
      else if (!data.IsTurnValid) {
        // set error message if turn played was not valid
        this.toastr.error(' ' + data.Message, 'Error!');
      }

      this.itsYourTurn = false;
      this.cardPlayedField = -2;
      this.colorProposedField = -1;
    });

    // set the flag so the cards can be set up again with the latest hand
    this.cardsSet = false;
  }

  StartGame_clicked() {
    console.log('StartGame_clicked!');
  }

  hideModal() {
    this.showModal = false;
    this.api.LoggedInPlayerId = null;
    this.api.ActiveGameId = null;
    this.api.ActiveGameName = null;
    this.api.LoggedInPlayerName = null;
    this.api.PlayerIndex = -1;
    this.api.ExpectedPlayerCount = 0;
    this.api.GamePlayerCount = 0;
    this.nav.navigate(['/']);
  }
}
