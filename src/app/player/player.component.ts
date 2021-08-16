import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from '../services/backend-api.service';
import { GamePlayer } from '../model/GamePlayer';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public thePlayer: GamePlayer;
  public loading = false;
  public newPlayerForm: FormGroup;
  public firstNameCtl: FormControl;
  public lastNameCtl: FormControl;
  public emailCtl: FormControl;

  constructor(
    private router: ActivatedRoute,
    private nav: Router,
    private backendApi: BackendApiService
  ) { }

  ngOnInit() {
    console.log('player.component::ngOnInit started');

    this.firstNameCtl = new FormControl('', Validators.required);
    this.lastNameCtl = new FormControl('', Validators.required);
    this.emailCtl = new FormControl('', Validators.required);
    this.newPlayerForm = new FormGroup({
      firstNameCtl: this.firstNameCtl,
      lastNameCtl: this.lastNameCtl,
      emailCtl: this.emailCtl
    });

    this.router.params.subscribe(params => {
      if (params.GamePlayerId !== 'new') {
        this.loading = true;
        console.log('Getting the selected player: ' + params.GamePlayerId)
        this.backendApi.getPlayer(params.GamePlayerId).subscribe( data => {
          console.log('got existing player - filling up form with existing values');
          this.thePlayer = data;
          this.firstNameCtl.setValue(this.thePlayer.FirstName);
          this.lastNameCtl.setValue(this.thePlayer.LastName);
          this.emailCtl.setValue(this.thePlayer.email);
          this.loading = false;
        })
      }
    })

    console.log('Completed player.component::ngOnInit')
  }

  valiateFirstName(){
    return this.firstNameCtl.invalid && this.firstNameCtl.touched;
  }

  validateLastName(){
    return this.lastNameCtl.invalid && this.lastNameCtl.touched;
  }

  validateEmail(){
    return this.emailCtl.invalid && this.emailCtl.touched;
  }

  SavePlayer(myformdata) {
    this.loading = true;

    console.log('getting player values to save');
    if( !this.thePlayer ){
      this.thePlayer = new GamePlayer();
    }
    this.thePlayer.FirstName = this.firstNameCtl.value;
    this.thePlayer.LastName = this.lastNameCtl.value;
    this.thePlayer.email = this.emailCtl.value;

    console.log('creating/updating player');
    this.backendApi.createPlayer(this.thePlayer).subscribe(data => {
      this.loading = false;
      this.nav.navigate(['/allplayers']);
    });
    
    console.log('completed SavePlayer');
  }
}
