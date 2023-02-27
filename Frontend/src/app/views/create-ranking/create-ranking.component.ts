import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Partida } from 'src/app/model/partida';
import { PartidasService } from 'src/app/service/partidas.service';


@Component({
  selector: 'app-create-ranking',
  templateUrl: './create-ranking.component.html',
  styleUrls: ['./create-ranking.component.css']
})

export class CreateRankingComponent {

  showSuccess = false;
  showError500 = false;
  newRanking!: Partida;
  
  id!: number;
  juego!: string;
  jugadores!: string;
  fecha!: string;
  hora!: string;
  ganador!: string;

  RankingForm = this.formBuilder.group({
    id: '',
    juego: '',
    jugadores: '',
    fecha: '',
    hora: '',
    ganador: '',
  });


  registerform = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(1)

    ]),
    juego: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]$")

    ]),
    jugadores: new FormControl('', [
      Validators.required,
      Validators.minLength(1)

    ]),
    fecha: new FormControl('', [
      Validators.required,
      Validators.pattern("/^[0-9]{4}\/[0-9]{1,2}\/[0-9]{2}$/")
    ]),
    hora: new FormControl('', [
      Validators.required,
      Validators.pattern("^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$")
    ]),
    ganador: new FormControl('', [
      Validators.required,
      Validators.minLength(1)

    ])

  })

  constructor(private rankingService: PartidasService, private router: Router, private formBuilder: FormBuilder) { }


  /**
   * This methods create a new ranking
   * getting the values from the ranking form
   * and creating a new ranking object
   * and send the objecto to the server
   */
  CreateNewRanking(): void {

    this.newRanking = new Partida(
      this.RankingForm.get(['id'])?.value,
      this.RankingForm.get(['juego'])?.value,
      this.RankingForm.get(['jugadores'])?.value,
      this.RankingForm.get(['fecha'])?.value,
      this.RankingForm.get(['hora'])?.value,
      this.RankingForm.get(['ganador'])?.value);

    this.rankingService.createPartida(this.newRanking).subscribe(data => {
      this.showSuccess = true;
      setTimeout(() => {
        this.router.navigate(['/Ranking']);
      }, 2000);
    }, (error) => {
      if (error.status === 500) {
        this.showError500 = true;
      }
    })
  }
}
