/* Añada la biblioteca como dependencia del proyecto a través de npm */
import throttle from 'lodash.throttle';

/* Inicialice el reproductor en el archivo de script */
import Player from '@vimeo/player';

/* Guarde el tiempo de reproducción en el almacenamiento local. Deje que la clave sea la secuencia "videoplayer-current-time" */
const localKey = 'videoplayer-current-time';

/* accedemos al dom para hacer uso de la etiqueta iframe con el id = "vimeo-player" */
const iframe = document.querySelector('#vimeo-player');

/* creamos una nueva instancia de un nuevo objeto  */
const player = new Player(iframe);

/* Ordene la documentación del método on() y empiece a seguir el evento timeupdate, actualización del tiempo de reproducción. */
const onPlay = function (event) {
  localStorage.setItem(localKey, event.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));
/* el reproductor de Vimeo comenzará a reproducir el video desde la posición almacenada en lugar de desde el inicio.*/
player.setCurrentTime(JSON.parse(localStorage.getItem(localKey)) || 0);

