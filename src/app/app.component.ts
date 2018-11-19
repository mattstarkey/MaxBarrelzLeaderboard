import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


export class Score {
  PlayerName: string;
  Score: number;

  constructor(name: string, score: number) {
    this.PlayerName = name;
    this.Score = score;
  }
}

const ELEMENT_DATA: Score[] = [
  { Score: 1, PlayerName: 'Hydrogen' },
  { Score: 1, PlayerName: 'Hydrogen' },
  { Score: 1, PlayerName: 'Hydrogen' },
  { Score: 1, PlayerName: 'Hydrogen' },
  { Score: 1, PlayerName: 'Hydrogen' },
  { Score: 1, PlayerName: 'Hydrogen' },
  { Score: 1, PlayerName: 'Hydrogen' },
  { Score: 1, PlayerName: 'Hydrogen' },
  { Score: 1, PlayerName: 'Hydrogen' },
  { Score: 1, PlayerName: 'Hydrogen' }
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items: Array<any>;
  scores: Array<Score> = [];

  displayedColumns: string[] = ['position', 'PlayerName', 'Score'];
  dataSource = ELEMENT_DATA;

  constructor(db: AngularFireDatabase) {

    db.list('scores', ref =>
      ref.orderByChild('Score').limitToLast(20))
      .valueChanges()
      .subscribe(snapshot => {
        this.items = snapshot.reverse();

        var temp = [];

        snapshot.forEach((score: any) => {
          console.log(score);
          if (score.PlayerName == "") {
            score.PlayerName = "Unkown"
          }
          temp.push(new Score(score.PlayerName, score.Score))
        });

        this.scores = temp;

      });

  }

  title = 'Max Barrelz Leaderboard';

}
