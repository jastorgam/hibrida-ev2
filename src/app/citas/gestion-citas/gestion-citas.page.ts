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
import { CitasService } from '../../services/citas.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cita } from '../../models/citas';
import { AddCitaComponent } from '../add-cita/add-cita.component';
import { ListCitasComponent } from '../list-citas/list-citas.component';

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
    AddCitaComponent,
    ListCitasComponent,
  ],
})
export class GestionCitasPage implements OnInit, OnDestroy {
  citas!: Cita[];

  constructor(public citaService: CitasService) {}

  async ngOnInit() {
    console.log('GestionCitas init');
    await this.citaService.iniciarPlugin();
    await this.actualizar();
  }

  async createCita(cita: Cita) {
    console.log('crearCita', cita);
    await this.citaService.addCita(cita);
    this.actualizar();
  }

  private async actualizar() {
    this.citas = await this.citaService.getCitas();
  }

  ngOnDestroy(): void {
    this.citaService.cerrarConexion();
  }

  async deleteCita(cita: Cita) {
    console.log('deleteCita', cita);
    await this.citaService.removeCita(cita);
    await this.actualizar();
  }

  navegateHome() {
    this.citaService.navegateHome();
  }
}
