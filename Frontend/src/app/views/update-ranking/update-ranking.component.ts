import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Partida } from 'src/app/model/partida';
import { PartidasService } from 'src/app/service/partidas.service';

@Component({
  selector: 'app-update-ranking',
  templateUrl: './update-ranking.component.html',
  styleUrls: ['./update-ranking.component.css']
})
export class UpdateRankingComponent implements OnInit {
  
  public code!: string;

  public partidas: Partida[] = [];
  public UpdatePartida!: Partida;

  UpdateForm = this.formBuilder.group({
    id: '',
    juego: '',
    jugadores: '',
    fecha: '',
    hora: '',
    ganador: '',
  });


  /**
   * THis method gets the station selected by a code
   * and sets the station to modify
   */

  constructor(
    private formBuilder: FormBuilder,
    private RankingService: PartidasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const res = this.activatedRoute.snapshot.paramMap.get('id');
    if (res !== null) {
      this.code = res;
      this.RankingService
        .getPartidas()
        .subscribe(
          (result: any) => {
            this.partidas= result.data;
            console.log(this.partidas);

        });
    } else {
      this.code = '';
    }
  }

  
  SubmitUpdateData(): void{
  this.UpdatePartida = new Partida(
    this.UpdateForm.get(['id'])?.value,
    this.UpdateForm.get(['juego'])?.value,
    this.UpdateForm.get(['jugadores'])?.value,
    this.UpdateForm.get(['fecha'])?.value,
    this.UpdateForm.get(['hora'])?.value,
    this.UpdateForm.get(['ganador'])?.value)


    this.RankingService.Update(this.UpdatePartida).subscribe(
      (data: any) => {
        console.log(data);
      }
    )
};



}
