# Taskflow — Lista de tareas

Aplicación de lista de tareas creada con HTML, CSS y JavaScript puro como proyecto de portfolio de Marcos.

## Funcionalidades

- Añadir tareas y validar que el texto no esté vacío.
- Marcar tareas como completadas o pendientes.
- Eliminar tareas individuales.
- Filtrar todas, pendientes y completadas.
- Borrar las tareas completadas.
- Mostrar estadísticas y barra de progreso.
- Guardar y recuperar las tareas con `localStorage`.
- Diseño responsive, accesibilidad básica y soporte para movimiento reducido.

## Tecnologías

- HTML5 semántico
- CSS3 (Grid, Flexbox, media queries y variables CSS)
- JavaScript (DOM, eventos, arrays, objetos, funciones y Web Storage)

## Ejecutar localmente

Abre `index.html` en un navegador moderno. No necesita instalación ni dependencias de compilación. Para probar el guardado, es recomendable abrir la web desde un servidor o GitHub Pages; el comportamiento de `localStorage` al abrir archivos `file://` puede variar entre navegadores.

## Publicar dentro del repositorio del portfolio

Para mantener la web personal en la raíz del repositorio `Marcos-3019/Portafolio`, crea una carpeta `lista-tareas` dentro de ese repositorio y sube ahí los tres archivos:

- `lista-tareas/index.html`
- `lista-tareas/style.css`
- `lista-tareas/script.js`

Una vez que GitHub Pages actualice el sitio, la aplicación estará disponible en:

`https://marcos-3019.github.io/Portafolio/lista-tareas/`

## Ideas para futuras mejoras

- Editar una tarea existente.
- Añadir fecha límite y prioridad.
- Añadir pruebas automatizadas.
- Separar la lógica en módulos cuando avance la formación.

## Nota

Las tareas se guardan únicamente en el navegador y dispositivo de quien usa la aplicación. No hay cuenta, sincronización entre dispositivos ni base de datos remota.
