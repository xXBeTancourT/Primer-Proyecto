import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Service1Service } from '../../components/services/service1.service';

@Component({
  selector: 'app-comp2',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './comp2.component.html',
  styleUrl: './comp2.component.css',
})
export class Comp2Component {
  // Datos que recibe del padre
  //@Input() dato1 = 0;
  //@Input() dato2 = 0;
  constructor(public servicio: Service1Service) {}
  ngOnInit() {
    console.log('Dato 1 desde servicio:', this.servicio.dato1);
    console.log('Dato 2 desde servicio:', this.servicio.dato2);
  }

  muestraMenu = false;

  estadoSeleccionado = 'TODOS';

  operaciones = [
    {
      numero: 'OP-2025-001',
      cliente: 'Importadora Andina',
      estado: 'LIQUIDADA',
      fecha: '2025-01-20',
      total: 6415000,
    },
    {
      numero: 'OP-2025-002',
      cliente: 'Importadora Andina',
      estado: 'EN_TRAMITE',
      fecha: '2025-02-11',
      total: 3880000,
    },
    {
      numero: 'OP-2025-006',
      cliente: 'Comercializadora del Caribe',
      estado: 'LIQUIDADA',
      fecha: '2025-01-31',
      total: 2420000,
    },
    {
      numero: 'OP-2025-009',
      cliente: 'Textiles Pacifico',
      estado: 'LIQUIDADA',
      fecha: '2025-02-18',
      total: 5670000,
    },
    {
      numero: 'OP-2025-010',
      cliente: 'Textiles Pacifico',
      estado: 'EN_TRAMITE',
      fecha: '2025-05-06',
      total: 1550000,
    },
    {
      numero: 'OP-2025-016',
      cliente: 'Quimicos del Norte',
      estado: 'ANULADA',
      fecha: '2025-06-30',
      total: 250000,
    },
  ];

  operacionesFiltradas = this.operaciones;

  filtrarOperaciones() {
    if (this.estadoSeleccionado === 'TODOS') {
      this.operacionesFiltradas = this.operaciones;
    } else {
      this.operacionesFiltradas = this.operaciones.filter(
        (op) => op.estado === this.estadoSeleccionado,
      );
    }
  }

  sumar() {
    return this.servicio.dato1 + this.servicio.dato2;
  }
}
