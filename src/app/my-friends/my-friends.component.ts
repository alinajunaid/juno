import { Component, OnInit } from '@angular/core';
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
  showModal: boolean;
  UserId: string;
  Firstname: string;
  Lastname: string;
  Email: string;

  constructor(private api: BackendApiService) { }

  ngOnInit() {
    this.SelectedCard = '<placeholder>';
    this.currentFirstCard = 0;
    this.dataList = new Array(10);
    this.dataList[0] = 'test 1';
    this.dataList[1] = 'test 2';
    this.dataList[2] = 'test 3';
    this.dataList[3] = 'test 4';
    this.dataList[4] = 'test 5';
    this.dataList[5] = 'test 6';
    this.dataList[6] = 'test 7';
    this.dataList[7] = 'test 8';
    this.dataList[8] = 'test 9';
    this.dataList[9] = 'test 10';

    this.msgList = new Array(3);
    this.msgList[0] = 'test 1';
    this.msgList[1] = 'test 2';
    this.msgList[2] = 'test 3';

    this.modalTitle = 'Testing';
    this.modalMessage = 'Calling Test Run';
  }

  onCardSelected(value: string): void {
    this.SelectedCard = value;
  }

  get eanbleLeft() {
    return this.currentFirstCard > 0;
  }

  OnLeft() {
    if (this.currentFirstCard > 0) {
      this.currentFirstCard--;
      this.msgList[0] = this.dataList[this.currentFirstCard];
      this.msgList[1] = this.dataList[this.currentFirstCard + 1];
      this.msgList[2] = this.dataList[this.currentFirstCard + 2];
    }
    //console.log(this.currentFirstCard);
  }


  get enableRight() {
    return this.currentFirstCard > 6;
  }

  OnRight() {
    if (this.currentFirstCard < 7) {
      this.currentFirstCard++;
      this.msgList[0] = this.dataList[this.currentFirstCard];
      this.msgList[1] = this.dataList[this.currentFirstCard + 1];
      this.msgList[2] = this.dataList[this.currentFirstCard + 2];
    }
    //console.log(this.currentFirstCard);
  }

  onClick(event) {
    this.showModal = true; // Show-Hide Modal Check
    this.UserId = event.target.id;
    this.Firstname = document.getElementById("firstname" + this.UserId).innerHTML;
    this.Lastname = document.getElementById("lastname" + this.UserId).innerHTML;
    this.Email = document.getElementById("email" + this.UserId).innerHTML;

  }
  //Bootstrap Modal Close event
  hide() {
    console.log('Sending Test Run call');

    this.api.CallRun().subscribe( result => {
      console.log("Test Run result: " + result);
    });
    this.showModal = false;
  }
}
