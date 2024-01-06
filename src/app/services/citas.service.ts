import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Cita } from '../models/citas';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  plataforma: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  private async _inicializarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector('jeep-sqlite');
    if (jeepSqliteEl != null) await this.sqlite.initWebStore();
  }

  async iniciarPlugin() {
    this.plataforma = Capacitor.getPlatform();
    if (this.plataforma == 'web') {
      await this._inicializarPluginWeb();
    }

    await this.abrirConexion();
    await this.crearSchema();
  }

  private async crearSchema() {
    const schema = `CREATE TABLE IF NOT EXISTS CITAS (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      CITA TEXT NOT NULL,
      AUTOR TEXT NOT NULL
    );`;

    await this.db.execute(schema);
  }

  private async abrirConexion() {
    this.db = await this.sqlite.createConnection(
      'citas.sqlite',
      false,
      'no-encryption',
      1,
      false
    );
    await this.db.open();
  }

  async cerrarConexion() {
    this.db.close();
  }

  async cargaCitas() {
    console.log('CargarCitas');
    // Solo se ejecuta la primera vez desde home
    const citas = await this.getCitas();
    if (citas.length == 0) {
      await this.http.get<Cita[]>('assets/json/citas.json').subscribe({
        next: (data) => {
          console.log(data);
          this.db.beginTransaction();
          data.forEach((c) => this.addCita(c));
          this.db.commitTransaction();
        },
      });
    }
  }

  async getCitas(): Promise<Cita[]> {
    const sql = `SELECT * FROM CITAS`;
    const citas = await this.db.query(sql);
    const citass: Cita[] = [];

    citas.values?.forEach((c) => {
      const cc = new Cita(c.CITA, c.AUTOR, c.ID);
      citass.push(cc);
    });

    return Promise.resolve(citass);
  }

  async removeCita(id?: number) {
    const sql = `DELETE FROM CITAS WHERE ID = ?`;
    console.log(sql);
    await this.db.run(sql, [id]);
  }

  async addCita(cita: Cita) {
    const sql = `INSERT INTO CITAS(CITA, AUTOR) VALUES(?,?)`;
    await this.db.run(sql, [cita.cita, cita.autor]);
  }

  async getShowCitas() {
    let sc: string | null = (await Preferences.get({ key: 'showCitas' })).value;
    return sc != null ? sc.toLowerCase() == 'true' : true;
  }

  async setShowCitas(valor: boolean) {
    return await Preferences.set({ key: 'showCitas', value: valor.toString() });
  }

  navegateHome() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
