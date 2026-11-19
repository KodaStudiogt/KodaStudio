# Arquitectura de KodaStudio

El proyecto es una página estática sin dependencias de compilación. `index.html` carga `css/main.css` y el módulo JavaScript `js/main.js`.

## Estilos

- `css/base/` contiene el reset, los tokens visuales y la tipografía.
- `css/layout/` define las áreas principales de la página.
- `css/components/` contiene estilos reutilizables para controles y elementos.
- `css/utilities/` agrupa animaciones y reglas responsivas.
- `css/main.css` importa los estilos en orden de dependencia.

## JavaScript

- `js/main.js` inicializa los módulos de la página.
- `js/config/selectors.js` centraliza los selectores DOM compartidos.
- `js/modules/` contiene comportamientos independientes: navegación, revelado, selección de servicios, formulario y año del footer.
- `js/utils/validation.js` contiene validación pura reutilizable.

Los módulos toleran que sus elementos no existan en una página; esto permite reutilizarlos sin acoplarlos a una única plantilla. El formulario solo valida en el navegador: se debe conectar un servicio o backend antes de habilitar el envío real. Las fuentes usan la pila del sistema; `assets/fonts/` se puede agregar si el proyecto adopta fuentes alojadas localmente.

## Recursos estáticos

`assets/images/` organiza imágenes por propósito y `assets/icons/` reserva el espacio para iconos. No se incluyen recursos binarios hasta que el proyecto defina sus necesidades visuales.
