import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { CitasService } from '../services/citas.service';
import { Cita } from '../models/citas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonButtons,
    IonIcon,
    CommonModule,
    FormsModule,
    RouterModule,
    IonFab,
    IonFabButton,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  cita!: Cita;
  showCitas!: boolean;

  constructor(public citaService: CitasService) {
    // addIcons({ settings-outline })
  }

  async ngOnInit() {
    console.log('Home init');
    await this.citaService.iniciarPlugin();
    await this.citaService.cargaCitas();
    this.showCitas = await this.citaService.getShowCitas();

    this.citaService.getCitas().then((citas) => {
      console.log('Rescatando data de citas', citas);
      const numeroAleatorio = Math.floor(Math.random() * citas.length);
      this.cita = citas[numeroAleatorio];
    });
  }

  async ngOnDestroy() {
    await this.citaService.cerrarConexion();
  }
}
