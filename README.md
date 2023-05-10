# check-in-exercise for airline

---

Es una API REST creada con Node.js, Express.js y MySQL creada con el fin de simular un proceso de check-in en un aeropuerto.

## Instalación

1. Clonar este repositorio GitHub:

```bash
git clone https://github.com/MrVega01/check-in-exercise.git
```
2. Instalar las dependencias utilizando npm.

```bash
npm install
```

## Arranque

``npm start``: Inicia la API normalmente.

``npm run dev``: Inicia la API con nodemon, lo que actualiza la app al detectar cualquier cambio en el código.

## Estatus

**Node**: >= 18.16.0

**NPM**: >= 9.5.1

## PORT

El puerto por defecto es ``3000`` lo que significa al arrancar la API en local se montará en ``localhost:3000``

## Variables de entorno

La funcionalidad de la API requiere de variables de entorno para la autenticación en la base de datos al ser esta información sensible. De igual modo es posible hacer cambios en la API a través de variables de entorno, como lo puede ser ``PORT``, que permite modificar el puerto en el que arranca la misma (útil especialmente para despliegue). Para ver la lista de variables de entorno requeridas, ver archivo ``.env.example``

## Problema

Se busca crear una API REST, lenguaje y/o framework a libre elección, con un solo endpoint que permita consultar por el ID del vuelo y retornar la simulación. Una compra puede tener muchas tarjetas de embarque asociadas, pero estas tarjetas pueden no tener un asiento asociado, siempre tendrá un tipo de asiento, por lo tanto, al retornar la simulación del check-in se debe asignar el asiento a cada tarjeta de embarque.

### Los puntos a tomar en cuenta son:

* Todo pasajero menor de edad debe quedar al lado de al menos uno de sus acompañantes mayores de edad (se
puede agrupar por el id de la compra).
* Si una compra tiene, por ejemplo, 4 tarjetas de embarque, tratar en lo posible que los asientos que se asignen
estén juntos, o queden muy cercanos (ya sea en la fila o en la columna).
* Si una tarjeta de embarque pertenece a la clase “económica”, no se puede asignar un asiento de otra clase.

## Solución al problema

Lo más importante fue asignar la forma en que se realizará la petición SQL para obtener la información, mi solución fue solicitar toda la información que pueda estar asociada con las tarjetas de embarque y que sea de utilidad para lo que se busca. Para esta llamada me enfoqué en obtener la información del pasajero, el vuelo, el avión y el tipo de asiento, los cuales se asocian a la tabla principal (``boarding_pass``) y son siempre valores que harán match y funcionan bien con ``INNER JOIN``. Para obtener los asientos que están asignados de forma previa, usé ``LEFT JOIN`` con la tabla de asientos para obtener estos datos en caso de que existan.

Con esta información ya fue suficiente para hacer la mitad del ejercicio, sin embargo, hizo falta hacer una consulta más para obtener todos los asientos y así poder encontrar cual **id** corresponde según las filas, columnas y avión.

La proceso de asignación de asientos sigue el siguiente orden:

* Registrar la posición de los pasajeros que han sido marcados previamente (ya poseían un ``seat_id`` preestablecido).
* Registrar a los grupos de personas con al menos un menor de edad (agrupados por su id de compra) colocando al menor al lado de al menos un acompañante de su grupo.
* Registrar a los grupos de personas mayores de edad lo más cercano posible entre ellos.

Este proceso también comprende la asignación de los asientos según su tipo.
