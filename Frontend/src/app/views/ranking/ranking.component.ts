import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { windowTime } from 'rxjs';
import { Partida } from 'src/app/model/partida';
import { PartidasService } from 'src/app/service/partidas.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  ranking: Partida[] = [];
  selectedRanking!: Partida;
  newRanking!: Partida;
  showError404: boolean = false;
  showSuccess: boolean = false;
  showError500: boolean = false;

  currentPage = 1;
  itemsPerPage = 10;

  displayForm = false;

  id!: number;
  juego!: string;
  jugadores!: string;
  fecha!: string;
  hora!: string;
  ganador!: string;

  UpdateForm = this.formBuilder.group({
    id: '',
    juego: '',
    jugadores: '',
    fecha: '',
    hora: '',
    ganador: '',
  });




  constructor(private rankingService: PartidasService, private router: Router, private formBuilder: FormBuilder) { }


  /**
   * This method call the Ranking service
   * and gets the data from NodeJS response
   */
  ngOnInit(): void {
    this.rankingService.getPartidas().subscribe(
      (data: Partida[]) => {
        this.ranking = data;
        this.selectedRanking = data[1];
      }, (error) => {
        if (error.status === 404) {
          this.showError404 = true;
        } else {
          this.showError500 = true;
        }
      }

    );
  }

  /**
   * Gets the clicked Ranking by button and 
   * gets the data from the clicked Ranking
   * @param ranking 
   */
  onSelect(ranking: Partida): void {
    this.selectedRanking = ranking;
  }


  /**
   * Deletes the clicked Ranking by 
   * the selected Ranking and send 
   * a request to the NodeJS to delete
   * the Ranking
   * @param partida 
   */
  DeleteRanking(partida: Partida): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.rankingService
        .deletePartida(partida)
        .subscribe(result => {
          if (result === null) {
            alert('Error to try to delete');
          } else {
            this.showError404 = false;
            this.showSuccess = true;
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }, (error) => {
          if (error.status === 404) {
            this.showError404 = true;
          } else {
            this.showError500 = true;
          }
        });
    } else {
      this.return();
    }
  }

  return(): void {
    this.router.navigate(['/Ranking'])
  }

  GoToRankingForm(): void {
    this.router.navigate(['/Create']);
  }

  ToUpdate(): void {
    this.router.navigate(['/Update', this.selectedRanking.id]); //
  }
}

