import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
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
import { CitasService } from '../services/citas.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cita } from '../models/citas';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
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
export class GestionCitasPage implements OnInit, OnDestroy {
  miFormulario: FormGroup;
  citas!: Cita[];

  constructor(
    public citaService: CitasService,
    private formBuilder: FormBuilder
  ) {
    this.miFormulario = this.formBuilder.group({
      strCita: ['', [Validators.required, Validators.minLength(5)]],
      strAutor: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  async ngOnInit() {
    console.log('GestionCitas init');
    await this.citaService.iniciarPlugin();
    await this.actualizar();
  }

  private async actualizar() {
    this.citas = await this.citaService.getCitas();
  }

  ngOnDestroy(): void {
    this.citaService.cerrarConexion();
  }

  async borrarCita(idx?: number) {
    await this.citaService.removeCita(idx);
    await this.actualizar();
  }

  async agregar() {
    if (this.miFormulario.valid) {
      await this.citaService.addCita({
        autor: this.miFormulario.get('strAutor')?.value,
        cita: this.miFormulario.get('strCita')?.value,
      });
      await this.actualizar();
      this.miFormulario.reset();
    } else {
      this.miFormulario.markAllAsTouched();
    }
  }

  navegateHome() {
    this.citaService.navegateHome();
  }
}
