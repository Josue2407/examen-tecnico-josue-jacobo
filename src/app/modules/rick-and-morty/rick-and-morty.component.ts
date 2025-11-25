import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-rick-and-morty',
  imports: [CommonModule],
  templateUrl: './rick-and-morty.component.html',
  styleUrl: './rick-and-morty.component.scss'
})
export class RickAndMortyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  personajes: any[] = [];
  alives: number = 0;
  unknow: number = 0;
  dead: number = 0;

  constructor(private api: RickAndMortyService) { }

  ngOnInit(): void {
    this.api.getPersonajes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: any) => {
        this.personajes = resp.results;
        this.getStatus()
      });
  }

  getStatus() {
    this.personajes.forEach(p => {
      if(p.status == 'Alive')this.alives++;
      else if(p.status == 'unknown')this.unknow++;
      else this.dead++;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
