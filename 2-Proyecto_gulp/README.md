# Práctica 2: Proyecto Gulp

##### Fecha de entrega:
Jueves 23 de Octubre de 2025

##### Trabajo realizado:
Tomando el mockup realizado en la práctica 1, se les han aplicado algunas herramientas de automatización y *bundling*, con el objetivo de cumplir con los siguientes requerimientos:

- Compilar Sass a CSS
- Minificar CSS
- Generar sourcemaps para depuración
- Optimizar imágenes de la carpeta img/
- Minificar archivos JS si los hubiera

Para ello, se hicieron dos ejercicios utilizado las herramientas ***gulp*** y ***parcel***.

###### Ejercicio 1:

En este primer ejercicio se hizo uso de **gulp**, una herramienta muy utilizada dentro del desarrollo web, debido a la multitud de tareas que permite automatizar de una forma sencilla.

**Gulp** se utiliza para:

- Definir las tareas que se van a ejecutar en el proceso.

- Definir el orden de esas tareas y cuándo van ejecutarse.

- Paralelizar tareas.

- Ejecutar tareas condicionales, atendiendo a las condiciones y opciones que se hayan definido.

De esta manera, tras elaborar un archivo *gulpfile.js* y *package.json*, e instalar los paquetes necesarios, se ha obtenido el siguiente log:

![Captura de pantalla](log_gulp.png)

desplegando así de forma efectiva la página diseñada.

###### Ejercicio 2:

**Parcel** surge con el propósito de simplificar las complejidades asociadas a los *bundlers* tradicionales, considerando que su configuración es mucho más rápida y sencilla que la de **gulp**.

**Parcel** tiene varias ventajas frente a otros *bundlers*, como son:

- Gestión de Activos Integrada

- Resolución Automática de Dependencias

- Tiempos de Construcción Rápidos

- División del Código Simplificada

En esta ocasión, lo único que se debió configurar fue un archivo *package.json*, donde se indicasen las dependencias que se debieran utilizar, y los scripts a los que haría referencia cada uno de los comandos aplicados. De esta manera, se obtuvo un log similar al que se muestra a continuación:

![Captura de pantalla](log_parcel.png)

##### Ejemplo de ejecución:

![Captura de pantalla](Mockup.png)