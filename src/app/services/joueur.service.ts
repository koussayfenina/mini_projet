import { Injectable } from '@angular/core';
import { joueur } from '../modele/joueur.modele';
import { Position } from '../modele/position.modele';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};



@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  joueurs! : joueur []; //un tableau de joueurs
  j !:joueur;
  position!:Position[];
  apiURL: string = 'http://localhost:8080/joueur/api';

  constructor(private http : HttpClient) { 
    /*this.position = [ {idCat : 1, nomCat : "BU"},
                      {idCat : 2, nomCat : "MC"},
                      {idCat : 3, nomCat : "GK"}];                      

    this.joueurs = [
      {idjoueur : 1, nomjoueur : "messi52", prixjoueur : 3000.600, equipejoueur :"barcalona",position:{idCat : 1, nomCat : "BU"}},
      {idjoueur : 2, nomjoueur : "ronaldo", prixjoueur : 450, equipejoueur:"real madrid",position:{idCat : 1, nomCat : "GK"}},
      {idjoueur : 3, nomjoueur :"rashford", prixjoueur : 900.123, equipejoueur:"man united",position:{idCat : 2, nomCat : "mc"}},
       ];*/
  }
  
  listeJoueur(): Observable<joueur []>{
    return this.http.get<joueur []>(this.apiURL);
  }

  ajouterjoueurs(j :joueur):Observable<joueur>{
    return this.http.post<joueur>(this.apiURL,j, httpOptions);
  }
   supprimerJoueur(id : number) {
      const url = `${this.apiURL}/${id}`;
      return this.http.delete(url, httpOptions);
      }
      consulterJoueur(id: number): Observable<joueur> {
        const url = `${this.apiURL}/${id}`;
          return this.http.get<joueur>(url);
        }
      trierjoueur(){
        this.joueurs = this.joueurs.sort((n1,n2) => {
        if (n1.idjoueur! > n2.idjoueur!) {
        return 1;
        }
        if (n1.idjoueur! < n2.idjoueur!) {
        return -1;
        }
        return 0;
        });
        }
      updatejoueur(p : joueur) : Observable<joueur>
      {
        return this.http.put<joueur>(this.apiURL, p, httpOptions);
      }

      listePositions():Observable<Position[]>{
        return this.http.get<Position[]>(this.apiURL+"/pos");
        }
      consulterPosition(id:number): Position{
        return this.position.find(cat => cat.idCat == id)!;
      }

      rechercherParNom(nom: string):Observable<joueur[]> {
        const url = `${this.apiURL}/ByName/${nom}`;
        return this.http.get<joueur[]>(url);
        }

        rechercherParpos(idPos: number):Observable<joueur[] > {
          const url = `${this.apiURL}/jpos/${idPos}`;
          return this.http.get<joueur[] >(url);
        }

}
