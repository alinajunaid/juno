import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnUnoCard } from 'src/app/model/AnUnoCard';
import { CardColor } from './CardColor';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.css']
})
export class TestCardComponent implements OnInit {
  @Input() thisCardId: number;
  @Input() thisCardTitle: string;
  @Output() cardSelected: EventEmitter<AnUnoCard> = new EventEmitter<AnUnoCard>();

  public cardColorList: CardColor [];
  public selectedColor: CardColor;
  public result: AnUnoCard;
  public showModal: boolean;

  constructor() { 
    this.cardColorList = [
      {ColorId:0, ColorName:'Blue'}, 
      {ColorId:0, ColorName:'Red'}, 
      {ColorId:0, ColorName:'Yellow'},
      {ColorId:0, ColorName:'Green'}
    ];
    this.showModal = false;
  }

  ngOnInit() {
    console.log('color list: ' + JSON.stringify(this.cardColorList));
  }

  localClick(){
    this.result = new AnUnoCard();
    this.result.CardTitle = this.thisCardTitle;
    
    if( this.thisCardId ){
      this.result.CardNumber = Number(this.thisCardId);
    }
    else{
      this.result.CardNumber = -2;
    }

    this.result.CardColor = 0;
    if( this.selectedColor && this.selectedColor.ColorId ) {
      this.result.CardColor =  this.selectedColor.ColorId;
    }
    

    if(this.result.CardNumber>56){
      //open modal
      this.showModal = true;
    }
    else{
      this.cardSelected.emit(this.result);
    }
  }

  hideModal(){
    this.showModal = false;
    this.cardSelected.emit(this.result);
  }
}
