# Bienvenida con Faro (admin-tutorials)

Reemplazo del componente `app-admin-tutorials` del ERP con el diseño de la opción A: un recorrido informativo guiado por Faro.

## Cómo instalarlo en el ERP

1. Reemplaza estos 3 archivos en la carpeta del componente `admin-tutorials` del ERP:
   - `admin-tutorials.component.ts`
   - `admin-tutorials.component.html`
   - `admin-tutorials.component.css`
2. (Opcional) Para la tipografía del diseño, agrega esta línea en el `<head>` de `src/index.html`. Si no la agregas, se usa la fuente del sistema.
   ```html
   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800&family=Barlow+Condensed:wght@600;700&display=swap">
   ```

## Qué cambia y qué no

- Se mantienen el selector `app-admin-tutorials`, la salida `closeTutorial` y el método `firstlogging()`. Al terminar se sigue llamando a `Auth/UpdateUserField?field=FirstLogin&value=0`.
- Ya no se usa `mat-stepper` ni los `FormGroup`. Tampoco se usan las imágenes de `src/app/img/adminTutorial`: Faro está dibujado en SVG dentro del HTML.
- El componente solo usa `*ngIf`, `*ngFor` y `ngSwitch`, que ya vienen en `CommonModule`.

## Para verlo con un usuario que ya no es nuevo

En el HTML del componente padre, cambia temporalmente la condición por `true`:

```html
<div *ngIf="true" class="principalDivAdminTutorials">
```

Devuélvela a `*ngIf="showTutorial"` antes de subir los cambios.
