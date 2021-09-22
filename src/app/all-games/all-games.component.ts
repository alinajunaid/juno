import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { GameInvitation } from '../model/GameInvitation';
import { Router } from '@angular/router';
import { GamePlayer } from '../model/GamePlayer';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {
  public allGames = [];
  public loading = false;


  constructor(
    private api: BackendApiService,
    private nav: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.api.getAllGames().subscribe( data=> {
      this.allGames = data;
      this.loading = false;
    });
  }

  viewGame(x:any) {}
}
