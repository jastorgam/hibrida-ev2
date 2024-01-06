import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonNote,
} from '@ionic/angular/standalone';
import { Cita } from '../../models/citas';

@Component({
  selector: 'app-add-cita',
  templateUrl: './add-cita.component.html',
  styleUrls: ['./add-cita.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonNote,
    IonList,
    IonItem,
    IonContent,
    RouterLink,
    IonCard,
    IonCardContent,
    IonInput,
    IonCardTitle,
    IonCardHeader,
    ReactiveFormsModule,
  ],
})
export class AddCitaComponent implements OnInit {
  miFormulario: FormGroup;

  @Output() createCita = new EventEmitter<Cita>();

  constructor(private formBuilder: FormBuilder) {
    this.miFormulario = this.formBuilder.group({
      strCita: ['', [Validators.required, Validators.minLength(5)]],
      strAutor: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit() {
    console.log('Init AddCitaComponent');
  }

  agregar() {
    if (this.miFormulario.valid) {
      let cita = new Cita(
        this.miFormulario.get('strCita')?.value,
        this.miFormulario.get('strAutor')?.value
      );

      this.createCita.emit(cita);
      this.miFormulario.reset();
    } else {
      this.miFormulario.markAllAsTouched();
    }
  }
}
