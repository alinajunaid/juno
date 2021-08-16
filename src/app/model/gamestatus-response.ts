import { Deck } from './deck';
import { GamePlayer } from './GamePlayer';

export class GameStatusResponse {
    GameStatusId : number;
    CurrentPlayer : number;
    GamePlayers: GamePlayer[];
    CurrentCard: number;
    PlayerCount: number;
    ExpectedCount: number;
    CurrentColor: number;
    Hand : Deck;
}