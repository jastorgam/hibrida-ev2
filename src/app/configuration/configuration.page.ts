import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonItem, IonList, IonToggle } from '@ionic/angular/standalone';
import { CitasService } from '../services/citas.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    IonicModule,
    CommonModule,
    IonToggle,
    IonItem,
    IonList,
    RouterModule,
    FormsModule,
  ],
})
export class ConfigurationPage implements OnInit {
  toggleValue: Boolean = false;

  constructor(private citaService: CitasService, private router: Router) {}

  async ngOnInit() {
    console.log('Configuration init');
    this.toggleValue = await this.citaService.getShowCitas();
    console.log(this.toggleValue);
  }

  toggleChange($event: CustomEvent) {
    this.citaService.setShowCitas($event.detail.checked);
    console.log($event.detail);
  }

  getDate() {
    return new Date().getTime();
  }

  navegateHome() {
    this.citaService.navegateHome();
  }
}
