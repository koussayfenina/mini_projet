import { Component, OnInit } from '@angular/core';
import { joueur } from '../modele/joueur.modele';
import { JoueurService } from '../services/joueur.service';
import { Position } from '../modele/position.modele';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-joueurs',
  templateUrl: './add-joueurs.component.html',
  styleUrls: ['./add-joueurs.component.css']
})
export class AddJoueursComponent {
  newjoueur= new joueur();
  position!:Position[];
  newIdCat!:number;
  newPosition!:Position;

  constructor(private joueurservice:JoueurService,private router:Router){}

  ngOnInit() {
    this.joueurservice.listePositions().
    subscribe(cats => {this.position = cats;
    console.log(cats);
  });

  }
    addJoueur(){
      this.newjoueur.position = this.position.find(cat => cat.idCat == this.newIdCat)!;
      this.joueurservice.ajouterjoueurs(this.newjoueur)
      .subscribe(prod => {
      console.log(prod);
      this.router.navigate(['joueurs']);
      });
    }
      

}
