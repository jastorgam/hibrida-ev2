import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { Cita } from '../../models/citas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-citas',
  templateUrl: './list-citas.component.html',
  styleUrls: ['./list-citas.component.scss'],
  standalone: true,
  imports: [IonItem, IonIcon, IonLabel, IonNote, CommonModule],
})
export class ListCitasComponent implements OnInit {
  @Input() citas: Cita[] = [];
  @Output() deleteCita = new EventEmitter<Cita>();

  constructor() {}

  ngOnInit() {
    console.log('Init ListCitasComponent');
  }

  borrarCita(c: Cita) {
    this.deleteCita.emit(c);
  }
}
