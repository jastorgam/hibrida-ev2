export class Cita {
  id?: number;
  autor!: string;
  cita!: string;

  constructor(cita: string, autor: string, id?: number) {
    this.autor = autor;
    this.cita = cita;
    this.id = id;
  }
}
