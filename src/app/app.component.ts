import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'operaciones-practica';
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
}
