import { Component, EventEmitter, Output } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Service1Service } from '../../components/services/service1.service';

@Component({
  selector: 'app-comp1',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.css',
})
export class Comp1Component {
  constructor(private servicio: Service1Service) {}
  // Datos que recibe del padre
  //@Input() dato1 = 0;
  //@Input() dato2 = 0;

  // Evento que devuelve los datos al padre
  @Output() abrirComp2 = new EventEmitter<void>();

  seleccionarComp2() {
    console.log('Dato 1 desde Comp1:', this.servicio.dato1);
    console.log('Dato 2 desde Comp1:', this.servicio.dato2);
    this.abrirComp2.emit();
  }
}
