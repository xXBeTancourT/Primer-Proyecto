import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comp1Component } from './components/comp1/comp1.component';
import { Comp2Component } from './components/comp2/comp2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    Comp1Component,
    Comp2Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  mostrarComp1 = false;
  mostrarComp2 = false;

  // Datos que nacen en el padre
  a = 2;
  b = 3;

  // Recibe los datos que devuelve Comp1
  recibirDatos() {
    this.mostrarComp2 = !this.mostrarComp2;
  }
}
