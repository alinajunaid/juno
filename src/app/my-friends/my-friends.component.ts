import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GameFriendRequest } from '../model/game-friendrequest';
import { GameFriend } from '../model/gameFriend';
import { GamePlayer } from '../model/GamePlayer';
import { BackendApiService } from '../services/backend-api.service';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css']
})
export class MyFriendsComponent implements OnInit {
  public msgList: string[];
  public SelectedCard: string;
  public modalTitle: string;
  public modalMessage: string;
  private dataList: string[];
  private currentFirstCard: number;
  public currentPlayer: string;
  private ReceivedFriendRequests: any[];
  private loading: boolean;
  public PlayerFriends: GameFriend[];
  public PlayerFriendRequests: GameFriendRequest[];
  sendRequestToEmail: string;
  showModal: boolean;
  UserId: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  testField: string;


  constructor(
    private api: BackendApiService,
    private toastr: ToastrService
    ) 
    { }

  ngOnInit() {
    this.SelectedCard = '<placeholder>';
    this.currentFirstCard = 0;
    // this.dataList = new Array(10);
    // this.dataList[0] = 'test 1';
    // this.dataList[1] = 'test 2';
    // this.dataList[2] = 'test 3';
    // this.dataList[3] = 'test 4';
    // this.dataList[4] = 'test 5';
    // this.dataList[5] = 'test 6';
    // this.dataList[6] = 'test 7';
    // this.dataList[7] = 'test 8';
    // this.dataList[8] = 'test 9';
    // this.dataList[9] = 'test 10';

    // this.msgList = new Array(3);
    // this.msgList[0] = 'test 1';
    // this.msgList[1] = 'test 2';
    // this.msgList[2] = 'test 3';

    this.modalTitle = 'Testing';
    this.modalMessage = 'Calling Test Run';
    this.currentPlayer = this.api.LoggedInPlayerUserName;
    
    if(this.api.LoggedInPlayerEmail){
      this.loading = true;

      console.log("asking for friends related data");
      var friendGamePlayer = new GamePlayer();
      friendGamePlayer.GamePlayerId = this.api.LoggedInPlayerId;
      friendGamePlayer.email = this.api.LoggedInPlayerEmail;

      console.log( 'getting friend requests for Player: ' + JSON.stringify(friendGamePlayer));
      this.api.getFriendRequests(friendGamePlayer).subscribe( data => {
        this.PlayerFriendRequests = data;
      });

      console.log( 'getting friends for Player: ' + JSON.stringify(friendGamePlayer));

      this.api.getFriends(friendGamePlayer).subscribe( data=> {
        console.log("got this data back:");
        console.log(data);
        this.PlayerFriends = data;
        this.loading = false;
      });
    }
  }

  OnSendFriendRequest() {
    if(this.sendRequestToEmail){
      var friendRq = new GameFriendRequest();
      friendRq.RequestingPlayerEmail = this.api.LoggedInPlayerEmail;
      friendRq.RequestingPlayerFirstName = this.api.LoggedInPlayerFirstName;
      friendRq.RequestingPlayerLastName = this.api.LoggedInPlayerLastName;
      friendRq.PlayerEmail = this.sendRequestToEmail;

      this.api.SendaFriendRequest(friendRq).subscribe( data => {
        this.toastr.info("Your Friend Request was Successfully Submitted.", "Congrats!");
      });
    }
  }

  onCardSelected(value: string): void {
    this.SelectedCard = value;
  }

  AcceptFriendRequest(friendRq: GameFriendRequest) {
    this.loading = true;
    this.api.AcceptFriendRequest(friendRq).subscribe( data => {
      this.PlayerFriendRequests.splice(this.PlayerFriendRequests.indexOf(friendRq), 1);

      console.log("asking for friends related data");
      var friendGamePlayer = new GamePlayer();
      friendGamePlayer.GamePlayerId = this.api.LoggedInPlayerId;
      friendGamePlayer.email = this.api.LoggedInPlayerEmail;
      
      console.log( 'getting friends for Player: ' + JSON.stringify(friendGamePlayer));

      this.api.getFriends(friendGamePlayer).subscribe( data=> {
        console.log("got this data back:");
        console.log(data);
        this.PlayerFriends = data;
        this.loading = false;
      });
    });
  }

  DeclineFriendRequest(friendRq: GameFriendRequest) {
    this.api.DeclineFriendRequest(friendRq).subscribe( data => {
      this.PlayerFriendRequests.splice(this.PlayerFriendRequests.indexOf(friendRq), 1);
    });
  }

  DeletePlayer(friend: GameFriend) {
    this.api.deleteFriend(friend).subscribe( data => {
      this.PlayerFriendRequests.splice(this.PlayerFriends.indexOf(friend), 1);
    });
    this.toastr.success("Selected friend was successfully deleted", "NOTE:")
  }


  // get eanbleLeft() {
  //   return this.currentFirstCard > 0;
  // }

  // OnLeft() {
  //   if (this.currentFirstCard > 0) {
  //     this.currentFirstCard--;
  //     this.msgList[0] = this.dataList[this.currentFirstCard];
  //     this.msgList[1] = this.dataList[this.currentFirstCard + 1];
  //     this.msgList[2] = this.dataList[this.currentFirstCard + 2];
  //   }
  //   //console.log(this.currentFirstCard);
  // }
  // get enableRight() {
  //   return this.currentFirstCard > 6;
  // }

  // OnRight() {
  //   if (this.currentFirstCard < 7) {
  //     this.currentFirstCard++;
  //     this.msgList[0] = this.dataList[this.currentFirstCard];
  //     this.msgList[1] = this.dataList[this.currentFirstCard + 1];
  //     this.msgList[2] = this.dataList[this.currentFirstCard + 2];
  //   }
  //   //console.log(this.currentFirstCard);
  // }

  // onClick(event) {
  //   this.showModal = true; // Show-Hide Modal Check
  //   this.UserId = event.target.id;
  //   this.Firstname = document.getElementById("firstname" + this.UserId).innerHTML;
  //   this.Lastname = document.getElementById("lastname" + this.UserId).innerHTML;
  //   this.Email = document.getElementById("email" + this.UserId).innerHTML;

  // }
  // //Bootstrap Modal Close event
  // hide() {
  //   console.log('Sending Test Run call');

  //   this.api.CallRun().subscribe( result => {
  //     console.log("Test Run result: " + result);
  //   });
  //   this.showModal = false;
  // }
}
